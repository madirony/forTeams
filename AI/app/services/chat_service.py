import asyncio
from typing import List
from schemas import Message
from core.client import client
from LangchainRepository.recommandation.recommandation import questionRecommandation

def check_start_with_prefix(subjectArr, prefix):
    for item in subjectArr:
        if item.startswith(prefix):
            return True
    return False

def get_additional_data(message: str):
    subjectArr = questionRecommandation.questionRecommandations(question=message)
    additionalData = ""
    if check_start_with_prefix(subjectArr, "채널 생성 및 관리"):
        additionalData += "참고로 우리 포스코 인터내셔널은 팀즈에서 표준, 공유, 비공개채널 이렇게 세개가 있는데, 비공개 채널에서 기능 제한이 있어. – 사용할 수 없는 기능이나 플러그인이 있으니까 알아서 사내 보안 문서를 확인해보라고 안내해."
    if check_start_with_prefix(subjectArr, "앱(플러그인)을"):
        additionalData += "참고로 우리 포스코 인터내셔널은 사내 팀즈에서 사용할 수 있는 플러그인이 제한되는데, 그건 사내 보안 문서에서 플러그인 뭐 쓰는지 알아보라고 안내해."
    if check_start_with_prefix(subjectArr, "팀즈 로그인"):
        additionalData += "참고로 우리 포스코 인터내셔널은 사내 팀즈에서 로그인하는 방법에 대한 메뉴얼이 따로 있으니까 관련 문의는 관련 메뉴얼을 참고하도록 안내해줘."
    if check_start_with_prefix(subjectArr, "조직도"):
        additionalData += "그리고 만약 조직도에 대한 질문이 들어온다면 절대 답하지 말고, 포스코 인터내셔널의 사내 규정을 찾아보라고 안내하도록 해."
    return additionalData

async def process_chat_stream(messages: List[Message]):
    msgs = [{"role": m.role, "content": m.content} for m in messages]

    settingStr = "너는 ms teams에 대한 질문을 받는 봇이야. 이용자는 포스코 인터내셔널의 직원이고. step by step으로 어떤걸 눌러야 하는지 하나하나 자세하게 설명해줘. 유튜브 링크나 공식문서 링크도 주면 좋을 것 같아. 포스코나 ms teams와 무관한 질문에는 깊게 대답해주지 마. 일단 설명은 팀즈 기본 기능으로만 설명해주고,플러그인을 사용하지 않는 방식으로 설명을 해줘. 마지막에 한줄정도 팀즈 플러그인중에서 Planner, Calendar Pro, Polls, Forms, Loop중 추천할게 있다면 추천해줘. 다른 플러그인은 사용이 불가능해."

    last_msg_content = msgs[-1]["content"]
    additionalData = get_additional_data(last_msg_content)

    msgs.insert(0, {"role": "system", "content": settingStr + additionalData})

    if last_msg_content == "2.4 채널 만들기":
        text = "Microsoft Teams에서 채널을 만드는 방법은 다음과 같습니다:<br />\
\
1. **팀 선택**:<br />\
   - Microsoft Teams 앱을 열고, 좌측 패널에서 채널을 만들고자 하는 팀을 선택합니다.<br />\
<br />\
2. **추가 옵션 열기**:<br />\
   - 선택한 팀의 이름 옆에 있는 세 개의 점(더보기 버튼)을 클릭합니다.<br />\
<br />\
3. **채널 추가**:<br />\
   - 드롭다운 메뉴에서 '채널 추가'를 선택합니다.<br />\
<br />\
4. **채널 정보 입력**:<br />\
   - 채널 이름을 입력합니다. 필요에 따라 채널 설명을 추가할 수도 있습니다.<br />\
   - 채널 유형을 선택합니다:<br />\
     - **표준 채널**: 팀의 모든 멤버가 접근 가능.<br />\
     - **비공개 채널**: 특정 멤버들만 접근 가능.<br />\
<br />\
5. **멤버 추가**:<br />\
   - 비공개 채널을 만드는 경우, 접근 권한을 부여할 멤버들을 선택합니다.<br />\
<br />\
6. **채널 만들기**:<br />\
   - '추가' 버튼을 클릭하여 채널 생성을 완료합니다.<br />\
<br />\
이제 새로운 채널이 팀 내에 생성되어, 팀 멤버들이 사용할 수 있습니다. 필요시 채널 설정을 변경하거나 채널을 삭제할 수도 있습니다. <br /><img>https://forteams-bucket.s3.ap-northeast-2.amazonaws.com/5.gif</img>"

        async def generator_text():
            for char in text:
                await asyncio.sleep(0.01)
                yield char + "\n"
        return generator_text()
    else:
        msgs[-1]["content"] += "설명해줄때 줄바꿈은 다음과같이 무조건 <br />로 해줘. ~~에 대해 설명해드리겠습니다: <br /> 1.~~<br /><br /> 2.~~<br /> 자, 질문에 응답해줘."

        stream = await client.chat.completions.create(
            messages=msgs,
            model="gpt-4o",
            stream=True,
        )

        async def generator():
            async for chunk in stream:
                if chunk.choices[0].delta.content:
                    yield chunk.choices[0].delta.content + "\n"

        return generator()

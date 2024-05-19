
from fastapi import FastAPI, Query, Body
from typing import List
import openai

from LangchainRepository.handler.messageStreamingHandler import StreamingStdOutCallbackHandler

from LangchainRepository.completion import requestCompletion
from LangchainRepository.recommandation.recommandation import questionRecommandation

from fastapi.responses import StreamingResponse
import time
from openai import AsyncOpenAI
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

from langchain.llms import OpenAI
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory

from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
import os
import sqlite3
from datetime import datetime
from sqlitedb import fetch_records_by_category, insert_record_with_embedding, initialize_and_insert_data, fetch_most_used_functions_by_dept



load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = openai.AsyncOpenAI(api_key="환경변수")



@app.get("/")
async def main():
    return "서버 연결 성공. 'http://127.0.0.1:8000/completion/test?question=챗봇아 안녕' 으로 요청을 보내보세요"




@app.get("/recommandation/question")
async def completionTest(question: str = Query(None, title="질문", description="유저가 보낸 질문을 입력해주세요")):
    return questionRecommandation.questionRecommandations(question= question) # 유저의 질문과 관련된 여러 비슷한 질문을 추천해준다.



class DepartmentRequest(BaseModel):
    dept: str

@app.post("/recommend/function")
def recommend_department(dept: DepartmentRequest = Body(...)):
    return fetch_most_used_functions_by_dept("example.db", dept.dept)



class Message(BaseModel):
    role: str
    content: str

class MessageList(BaseModel):
    messages: List[Message]
    user: dict





@app.post("/recommendation")
async def recommandation(message_list: MessageList = Body(...)):
    messages = message_list.messages
    user = message_list.user

    # messages_data = [
    #     {"role": "user", "content": "그러면 협력사 직원이랑 파일 공유는 어떻게 해?"},
    #     {"role": "assistant", "content": "파일 공유를 하고싶다면, 파일 공유를 하면 됩니다."},
    #     {"role": "user", "content": "어떻게 하는게 가장 쉬워?"},
    #     {"role": "assistant", "content": "파일 공유를 하고싶다면, 파일 공유를 하면 됩니다."},
    #     {"role": "user", "content": "어떻게 하는게 가장 쉬워?"},
    #     {"role": "assistant", "content": "파일 공유를 하고싶다면, 파일 공유를 하면 됩니다."},
    #     {"role": "user", "content": "어떻게 하는게 가장 쉬워?"},
    #     {"role": "assistant", "content": "파일 공유를 하고싶다면, 파일 공유를 하면 됩니다."},
    #     {"role": "user", "content": "사진도 공유가 가능해?"}
    # ]

    # messages = MessageList(messages=[Message(**msg) for msg in messages_data]).messages

    after = before = ""

    print(messages)
    userPrompt = ""

    if len(messages) > 2:
        userPrompt = "유저입력1: " + messages[len(messages) - 3].content + "\n" \
                       "gpt: " + messages[len(messages) - 2].content + "\n" \
                       "유저입력2: " + messages[len(messages) - 1].content + "\n" \
                         "위 대화들을 보고 아래와같은 형식으로  output 해줘. 지금 추천기능을 구현중인데, 유저가 어떤 질문으로 시작해서 어떤 질문으로 마무리가 되었는지를 파악하고있어."\
\
"["\
"a기능 사용하는 방법이 뭔가요?"\
"b기능 사용하는 방법이 뭔가요?"\
"]"\
"각 질문은 독립적으로 읽어서 이해할 수 있어야 하고, 각각 팀즈에 관련된 질문이어야 해."\
\
"이렇게 너가 생각할때 유저가 이런 질문들을 궁금했던 것 같다. 그렇게 추론해줘."\
"오로지 위와같은 파이썬 배열만을 리턴해줘. 시작질문과 끝질문"\
"그리고 유효하지 않은 질문들, 즉 팀즈의 질문추천으로 적절하지 않은 것은 배열에 추가하지 마."
    else:
        userPrompt = "유저입력: " + messages[len(messages) - 1].content + ""\
                                                              "이 질문을 포멀하게 정제해줘."

    message = await client.chat.completions.create(
        messages=[{"role": "system", "content": "너는 유저와 챗봇의 대화내용을 보고 배열을 리턴하는 챗봇이야. 아래와 같은 형식으로 리턴해.\n\
['ms teams에 관한 정제된 질문']"},
                {"role": "user", "content": userPrompt}],
        model="gpt-4o"
    )

    lastQuestion = ""
    print("gpt 응답: ", message.choices[0].message.content)
    if len(eval(message.choices[0].message.content)) < 2:
        after = before = questionRecommandation.questionRecommandations(eval(message.choices[0].message.content)[0])[0]
        print("추천하지 않겠습니다.")
        lastQuestion = eval(message.choices[0].message.content)[0]
    else:
        if len(messages) > 2:
            before = eval(message.choices[0].message.content)[0]
            after = eval(message.choices[0].message.content)[1]

            print(before)
            print(after)

            message = eval(message.choices[0].message.content)[1]


            before = questionRecommandation.questionRecommandations(question=before)[0]
            # after = questionRecommandation.questionRecommandations(question=after)[0]

            # 화상 회의_참가자 초대 -> 개인 채팅_채팅에서 사용자 초대하기
            # 이렇게 저장하는건 좀 의미가 없을 것 같고,
            # 화상 회의_참가자 초대 -> 초대한 유저를 어떻게 내보내나요?
            # 이렇게 질문 자체를 정제해서 저장하는게 나을 듯?
            print(before + " -> " + after)
            lastQuestion = after

            # 로그 저장
            # insert_record_with_embedding("example.db", before, 0, after, questionRecommandation.getEmbedding(question=after))
            after = questionRecommandation.questionRecommandations(question=after)[0]

        else:
            message = message.choices[0].message.content
            after = questionRecommandation.questionRecommandations(question=message)[0]
    # 질문 추천




    print(user['name'])
    print("님 이런 기능을 찾았군요?")
    print(after)

    initialize_and_insert_data("example.db", user['uuid'], user['name'], after, user['dept'], messages[len(messages) - 1].content)

    result = fetch_records_by_category(category=after, userUid=user['uuid'])


    if len(result) < 5:

        if len(messages) > 2:
            userPrompt = lastQuestion + "이 질문을 보고 아래와같은 형식으로  output 해줘. 현재 유저의 질문이 해결되고 그 다음 어떤 질문이 떠오를지 생각해서 ['예상질문1', '예상질문2', '예상질문3']이런식으로 유저에게서 추가적으로 어떤 ms teams에 대한 어떤 질문이 나올 것 같은지 3개를 배열로 output 해줘" \
\
""
        else:
            userPrompt = "유저입력: " + messages[len(messages) - 1].content + "" \
                      "위 문장을 보고 유저에게서 추가적으로 어떤 ms teams에 대한 어떤 질문이 나올 것 같은지 3개를 배열로 말해봐. 현재 유저의 질문이 해결되고 그 다음 어떤 질문이 떠오를지 생각해서 ['예상질문1', '예상질문2', '예상질문3'] 이런식으로 어떤 질문이 나올 것 같은지 3개를 output 해줘"


        message = await client.chat.completions.create(
            messages=[{"role": "system", "content": "너는 문답을 보고 예상 질문을 추천해주는 봇이야.\
다음과 같은 형식으로 리턴해줘\
\
[\
 '예상질문1',\
 '예상질문2',\
 '예상질문3'\
]"},\
                      {"role": "user", "content": userPrompt + "무조건 응답은 파이썬 배열로만 줘."}],
            model="gpt-4o"
        )
        aiResult = [item + "" for item in eval(message.choices[0].message.content)]

        print("질문 데이터 수가 충분하지 않아서 AI result에서 가져온걸 더해줬습니다." + after + "카테고리에서 가져온건 이거에요." )
        print(result)

        return result + aiResult
    else:
        print("질문 데이터 수가 충분해서 가져왔습니다." + after + "카테고리에서 가져옴.")
        return result


def check_start_with_prefix(subjectArr, prefix):
    # subjectArr 내의 각 문자열에 대해 반복
    for item in subjectArr:
        # 주어진 prefix로 시작하는지 확인
        if item.startswith(prefix):
            return True
    return False


def getAdditionalData(message):
    subjectArr = questionRecommandation.questionRecommandations(question= message)
    additionalData = ""
    if check_start_with_prefix(subjectArr, "채널 생성 및 관리"):
        print("채널 생성 및 관리 에 관한 메뉴얼 로딩...")
        additionalData += "참고로 우리 포스코 인터내셔널은 팀즈에서 표준, 공유, 비공개채널 이렇게 세개가 있는데, 비공개 채널에서 기능 제한이 있어. – 사용할 수 없는 기능이나 플러그인이 있으니까 알아서 사내 보안 문서를 확인해보라고 안내해."
    if check_start_with_prefix(subjectArr, "앱(플러그인)을"):
        print("플러그인에 관한 메뉴얼 로딩...")
        additionalData += "참고로 우리 포스코 인터내셔널은 사내 팀즈에서 사용할 수 있는 플러그인이 제한되는데, 그건 사내 보안 문서에서 플러그인 뭐 쓰는지 알아보라고 안내해."
    if check_start_with_prefix(subjectArr, "팀즈 로그인"):
        print("로그인에 관한 메뉴얼 로딩...")
        additionalData += "참고로 우리 포스코 인터내셔널은 사내 팀즈에서 로그인하는 방법에 대한 메뉴얼이 따로 있으니까 관련 문의는 관련 메뉴얼을 참고하도록 안내해줘."
    if check_start_with_prefix(subjectArr, "조직도"):
        print("조직도 관한 메뉴얼 로딩...")
        additionalData += "그리고 만약 조직도에 대한 질문이 들어온다면 절대 답하지 말고, 포스코 인터내셔널의 사내 규정을 찾아보라고 안내하도록 해."
    return additionalData


import asyncio

@app.post("/ask")
async def ask(message_list: MessageList = Body(...)):
    messages = message_list.messages

    # messages = [{"role": "user", "content": "ms teams에서 협력사 직원 우리 팀에 어떻게 초대해? "},
    #             {"role": "assistant", "content": "MS Teams에서 협력사 직원을 우리 팀에 초대하는 방법을 단계별로 설명드리겠습니다. ... 생략 ... "},
    #             {"role": "user", "content": "그러면 협력사 직원이랑 파일 공유는 어떻게 해?"},
    #             {"role": "assistant", "content": "파일 공유를 하고싶다면, 파일 공유를 하면 됩니다."},
    #             {"role": "user", "content": "어떻게 하는게 가장 쉬워?"}]

    after = before = ""


    settingStr = "너는 ms teams에 대한 질문을 받는 봇이야. 이용자는 포스코 인터내셔널의 직원이고. step by step으로 어떤걸 눌러야 하는지 하나하나 자세하게 설명해줘. 유튜브 링크나 공식문서 링크도 주면 좋을 것 같아. 포스코나 ms teams와 무관한 질문에는 깊게 대답해주지 마. 일단 설명은 팀즈 기본 기능으로만 설명해주고,플러그인을 사용하지 않는 방식으로 설명을 해줘. 마지막에 한줄정도 팀즈 플러그인중에서 Planner, Calendar Pro, Polls, Forms, Loop중 추천할게 있다면 추천해줘. 다른 플러그인은 사용이 불가능해."

    additionalData = getAdditionalData(messages[len(messages) - 1].content)

    messages.insert(0, {"role": "system", "content" : settingStr + additionalData})








    print(messages[len(messages) - 1].content)

    if messages[len(messages) - 1].content == "2.4 채널 만들기":

        def generatorText(msg):
            for char in msg:
                time.sleep(0.01)  # 30ms 대기
                yield char + "\n"

        return StreamingResponse(generatorText("Microsoft Teams에서 채널을 만드는 방법은 다음과 같습니다:<br />\
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
이제 새로운 채널이 팀 내에 생성되어, 팀 멤버들이 사용할 수 있습니다. 필요시 채널 설정을 변경하거나 채널을 삭제할 수도 있습니다. <br /><img>https://forteams-bucket.s3.ap-northeast-2.amazonaws.com/5.gif</img>"), media_type="text/plain")
    else:
        messages[len(messages) - 1].content += "설명해줄때 줄바꿈은 다음과같이 무조건 <br />로 해줘. ~~에 대해 설명해드리겠습니다: <br /> 1.~~<br /><br /> 2.~~<br /> 자, 질문에 응답해줘."

        stream = await client.chat.completions.create(
            messages=messages,
            model="gpt-4o",
            stream=True,
        )

        async def generator():
            async for chunk in stream:
                if chunk.choices[0].delta.content:  # 빈 문자열 제거
                    yield chunk.choices[0].delta.content + "\n" or ""

        return StreamingResponse(generator(), media_type="text/plain") # text/event-stream






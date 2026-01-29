import json
import logging
from typing import List
from schemas import Message
from core.client import client
from core.config import Config
from LangchainRepository.recommandation.recommandation import questionRecommandation
from sqlitedb import fetch_records_by_category, initialize_and_insert_data, fetch_most_used_functions_by_dept

logger = logging.getLogger(__name__)

async def recommend_questions(question: str):
    return questionRecommandation.questionRecommandations(question=question)

def recommend_functions_by_dept(dept: str):
    return fetch_most_used_functions_by_dept(Config.DATABASE_PATH, dept)

async def process_recommendation_chat(messages: List[Message], user: dict):
    after = before = ""
    userPrompt = ""
    lastQuestion = ""

    if len(messages) > 2:
        userPrompt = (
            f"유저입력1: {messages[-3].content}\n"
            f"gpt: {messages[-2].content}\n"
            f"유저입력2: {messages[-1].content}\n"
            "위 대화들을 보고 아래와같은 형식으로 output 해줘. 지금 추천기능을 구현중인데, 유저가 어떤 질문으로 시작해서 어떤 질문으로 마무리가 되었는지를 파악하고있어.\n"
            "[\"a기능 사용하는 방법이 뭔가요?\", \"b기능 사용하는 방법이 뭔가요?\"]\n"
            "각 질문은 독립적으로 읽어서 이해할 수 있어야 하고, 각각 팀즈에 관련된 질문이어야 해.\n"
            "이렇게 너가 생각할때 유저가 이런 질문들을 궁금했던 것 같다. 그렇게 추론해줘.\n"
            "오로지 위와같은 JSON 배열만을 리턴해줘. 시작질문과 끝질문\n"
            "그리고 유효하지 않은 질문들, 즉 팀즈의 질문추천으로 적절하지 않은 것은 배열에 추가하지 마."
        )
    else:
        userPrompt = f"유저입력: {messages[-1].content} 이 질문을 포멀하게 정제해줘. JSON 배열에 담아서 리턴해줘."

    try:
        response = await client.chat.completions.create(
            messages=[
                {"role": "system", "content": "너는 유저와 챗봇의 대화내용을 보고 JSON 배열을 리턴하는 챗봇이야. 아래와 같은 형식으로 리턴해.\n[\"ms teams에 관한 정제된 질문\"]"},
                {"role": "user", "content": userPrompt}
            ],
            model="gpt-4o"
        )

        content = response.choices[0].message.content.strip()
        if content.startswith("```"):
            content = content.strip("`").replace("json", "").strip()

        parsed_content = json.loads(content)

        if len(parsed_content) < 2:
            if not parsed_content:
                return []

            question = parsed_content[0]
            recommendations = questionRecommandation.questionRecommandations(question=question)
            after = recommendations[0] if recommendations else question
            lastQuestion = after
        else:
            if len(messages) > 2:
                before = parsed_content[0]
                after = parsed_content[1]

                rec_before = questionRecommandation.questionRecommandations(question=before)
                before = rec_before[0] if rec_before else before

                rec_after = questionRecommandation.questionRecommandations(question=after)
                after = rec_after[0] if rec_after else after

                lastQuestion = after
            else:
                question = parsed_content[0]
                rec = questionRecommandation.questionRecommandations(question=question)
                after = rec[0] if rec else question
                lastQuestion = after

        initialize_and_insert_data(Config.DATABASE_PATH, user.get('uuid'), user.get('name'), after, user.get('dept'), messages[-1].content)

        result = fetch_records_by_category(category=after, userUid=user.get('uuid'))

        if len(result) < 5:
            if len(messages) > 2:
                prompt = (
                    f"{lastQuestion} 이 질문을 보고 아래와같은 형식으로 output 해줘. "
                    "현재 유저의 질문이 해결되고 그 다음 어떤 질문이 떠오를지 생각해서 ['예상질문1', '예상질문2', '예상질문3']이런식으로 유저에게서 추가적으로 어떤 ms teams에 대한 어떤 질문이 나올 것 같은지 3개를 배열로 output 해줘"
                )
            else:
                prompt = (
                    f"유저입력: {messages[-1].content} 위 문장을 보고 유저에게서 추가적으로 어떤 ms teams에 대한 어떤 질문이 나올 것 같은지 3개를 배열로 말해봐. "
                    "['예상질문1', '예상질문2', '예상질문3'] 이런식으로 어떤 질문이 나올 것 같은지 3개를 output 해줘"
                )

            ai_response = await client.chat.completions.create(
                messages=[
                    {"role": "system", "content": "너는 문답을 보고 예상 질문을 추천해주는 봇이야. 다음과 같은 형식으로 JSON 배열로 리턴해줘. [\"예상질문1\", \"예상질문2\"]"},
                    {"role": "user", "content": prompt}
                ],
                model="gpt-4o"
            )

            ai_content = ai_response.choices[0].message.content.strip()
            if ai_content.startswith("```"):
                ai_content = ai_content.strip("`").replace("json", "").strip()

            ai_result = json.loads(ai_content)

            # Combine
            return list(result) + ai_result
        else:
            return result

    except Exception as e:
        logger.error(f"Error in recommendation: {e}")
        return []

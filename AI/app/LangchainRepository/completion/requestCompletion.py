
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

load_dotenv()

class completions():

    async def request(question, handler) -> str:
        # 객체 생성
        llm = ChatOpenAI(
            temperature=0.1,  # 창의성 (0.0 ~ 2.0)
            max_tokens=2048,  # 최대 토큰수
            model_name="gpt-3.5-turbo",  # 모델명
            streaming=True,
            callbacks=[handler]
        )
        return llm.predict(question)

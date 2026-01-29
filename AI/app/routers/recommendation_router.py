from fastapi import APIRouter, Query, Body
from services.recommendation_service import recommend_questions, recommend_functions_by_dept, process_recommendation_chat
from schemas import DepartmentRequest, MessageList

router = APIRouter()

@router.get("/recommandation/question")
async def completionTest(question: str = Query(None, title="질문", description="유저가 보낸 질문을 입력해주세요")):
    return await recommend_questions(question)

@router.post("/recommend/function")
def recommend_department(dept: DepartmentRequest = Body(...)):
    return recommend_functions_by_dept(dept.dept)

@router.post("/recommendation")
async def recommandation(message_list: MessageList = Body(...)):
    return await process_recommendation_chat(message_list.messages, message_list.user)

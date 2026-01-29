from fastapi import APIRouter, Body
from fastapi.responses import StreamingResponse
from services.chat_service import process_chat_stream
from schemas import MessageList

router = APIRouter()

@router.post("/ask")
async def ask(message_list: MessageList = Body(...)):
    generator = await process_chat_stream(message_list.messages)
    return StreamingResponse(generator, media_type="text/plain")

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import recommendation_router, chat_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(recommendation_router.router)
app.include_router(chat_router.router)

@app.get("/")
async def main():
    return "서버 연결 성공. 'http://127.0.0.1:8000/completion/test?question=챗봇아 안녕' 으로 요청을 보내보세요"

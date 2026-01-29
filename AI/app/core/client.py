from openai import AsyncOpenAI
from .config import Config

client = AsyncOpenAI(api_key=Config.OPENAI_API_KEY)

from pydantic import BaseModel
from typing import List, Dict, Any

class DepartmentRequest(BaseModel):
    dept: str

class Message(BaseModel):
    role: str
    content: str

class MessageList(BaseModel):
    messages: List[Message]
    user: Dict[str, Any]

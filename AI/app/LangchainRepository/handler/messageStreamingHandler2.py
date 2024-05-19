"""Callback Handler streams to stdout on new llm token."""
from __future__ import annotations

import sys
from typing import TYPE_CHECKING, Any, Dict, List

from LangchainRepository.websocket.stompClient import stompClient

from langchain_core.callbacks.base import BaseCallbackHandler

import time
import asyncio
if TYPE_CHECKING:
    from langchain_core.agents import AgentAction, AgentFinish
    from langchain_core.messages import BaseMessage
    from langchain_core.outputs import LLMResult


class StreamingStdOutCallbackHandler2(BaseCallbackHandler):
    """스트리밍을 위한 콜백 핸들러입니다. 스트리밍을 지원하는 LLM에서만 작동합니다."""

    def __init__(self):
        self.queue = asyncio.Queue()

    async def getValue(self):
        for number in range(1, 11):  # 1부터 10까지 숫자 생성
            # yield f"{number}\n"  # 숫자 뒤에 개행 문자를 포함하여 보냄

            token = await self.queue.get()
            yield token

    def on_llm_start(self, serialized: Dict[str, Any], prompts: List[str], **kwargs: Any) -> None:
        """LLM이 실행을 시작할 때 실행됩니다."""

    def on_chat_model_start(self, serialized: Dict[str, Any], messages: List[List[BaseMessage]], **kwargs: Any) -> None:
        """채팅 모델이 실행을 시작할 때 실행됩니다."""

    async def on_llm_new_token(self, token: str, **kwargs: Any) -> None:
        """새로운 LLM 토큰이 생성될 때 실행됩니다. 이 기능은 스트리밍이 활성화되었을 때만 사용 가능합니다."""
        # sys.stdout.write(token)

        # client = stompClient()
        # client.sendMessage(token)

        await self.queue.put(token)

        # sys.stdout.flush()

    def on_llm_end(self, response: LLMResult, **kwargs: Any) -> None:
        """LLM 실행이 종료될 때 실행됩니다."""

    def on_llm_error(self, error: BaseException, **kwargs: Any) -> None:
        """LLM에서 오류가 발생했을 때 실행됩니다."""

    def on_chain_start(self, serialized: Dict[str, Any], inputs: Dict[str, Any], **kwargs: Any) -> None:
        """체인 실행이 시작될 때 실행됩니다."""

    def on_chain_end(self, outputs: Dict[str, Any], **kwargs: Any) -> None:
        """체인 실행이 종료될 때 실행됩니다."""

    def on_chain_error(self, error: BaseException, **kwargs: Any) -> None:
        """체인 실행 중 오류가 발생했을 때 실행됩니다."""

    def on_tool_start(self, serialized: Dict[str, Any], input_str: str, **kwargs: Any) -> None:
        """도구가 실행을 시작할 때 실행됩니다."""

    def on_agent_action(self, action: AgentAction, **kwargs: Any) -> Any:
        """에이전트의 행동에 반응할 때 실행됩니다."""
        pass

    def on_tool_end(self, output: Any, **kwargs: Any) -> None:
        """도구 실행이 종료될 때 실행됩니다."""

    def on_tool_error(self, error: BaseException, **kwargs: Any) -> None:
        """도구에서 오류가 발생했을 때 실행됩니다."""

    def on_text(self, text: str, **kwargs: Any) -> None:
        """임의의 텍스트가 주어질 때 실행됩니다."""

    def on_agent_finish(self, finish: AgentFinish, **kwargs: Any) -> None:
        """에이전트 작업이 종료될 때 실행됩니다."""

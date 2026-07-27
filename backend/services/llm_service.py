import json
import logging
from typing import Any

from openai import AsyncOpenAI

from backend.config import settings  # pyright: ignore[reportMissingImports]

logger = logging.getLogger(__name__)


class LLMService:
    def __init__(self, api_key: str | None = None) -> None:
        self.api_key = api_key or settings.OPENAI_API_KEY
        self.model = settings.OPENAI_MODEL
        self.temperature = settings.OPENAI_TEMPERATURE
        self.max_tokens = settings.OPENAI_MAX_TOKENS
        self.client = AsyncOpenAI(api_key=self.api_key)

    async def chat(
        self,
        messages: list[dict[str, Any]],
        tools: list[dict[str, Any]] | None = None,
    ) -> dict[str, Any]:
        kwargs: dict[str, Any] = {
            "model": self.model,
            "temperature": self.temperature,
            "max_tokens": self.max_tokens,
            "messages": messages,
        }
        if tools:
            kwargs["tools"] = tools
            kwargs["tool_choice"] = "auto"

        completion = await self.client.chat.completions.create(**kwargs)
        message = completion.choices[0].message
        response: dict[str, Any] = {"content": message.content or "", "tool_calls": None}

        if message.tool_calls:
            response["tool_calls"] = [
                {
                    "id": tc.id,
                    "name": tc.function.name,
                    "arguments": json.loads(tc.function.arguments),
                }
                for tc in message.tool_calls
            ]

        logger.debug("LLM response: %s", response)
        return response

    async def generate_tool_response(
        self,
        conversation: list[dict[str, Any]],
        tool_output: dict[str, Any],
    ) -> str:
        conversation.append(
            {
                "role": "tool",
                "tool_call_id": tool_output["tool_call_id"],
                "content": json.dumps(tool_output["result"]),
            }
        )
        response = await self.chat(conversation)
        return response["content"] or "Done."

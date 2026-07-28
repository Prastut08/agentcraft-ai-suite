import logging
from typing import Any

from groq import AsyncGroq

from backend.config import settings  # pyright: ignore[reportMissingImports]

logger = logging.getLogger(__name__)


class GroqService:
    def __init__(self, api_key: str | None = None) -> None:
        self.api_key = api_key or settings.GROQ_API_KEY
        self.model = settings.GROQ_MODEL
        self.client = AsyncGroq(api_key=self.api_key)

    async def process_content(
        self,
        content: str,
        system_prompt: str = "Extract and summarize the key knowledge from the provided text. Return a concise summary and any actionable insights.",
    ) -> dict[str, Any]:
        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": content},
                ],
                temperature=0.3,
                max_tokens=2048,
            )
            return {
                "success": True,
                "content": response.choices[0].message.content or "",
                "model": self.model,
            }
        except Exception as exc:
            logger.error("Groq processing failed: %s", exc)
            return {
                "success": False,
                "content": "",
                "error": str(exc),
            }
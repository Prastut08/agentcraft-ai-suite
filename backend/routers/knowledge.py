import logging
import uuid
from typing import Any

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from backend.config import settings  # pyright: ignore[reportMissingImports]
from backend.repositories.firebase_repo import FirebaseRepository  # pyright: ignore[reportMissingImports]
from backend.services.groq_service import GroqService  # pyright: ignore[reportMissingImports]

logger = logging.getLogger(__name__)
router = APIRouter()


class GroqProcessRequest(BaseModel):
    file_url: str = Field(..., description="Firebase Storage download URL")
    file_name: str = Field(..., description="Original file name")
    doc_id: str = Field(..., description="Firestore document ID to update")
    user_id: str = Field(..., description="User ID")


class GroqProcessResponse(BaseModel):
    success: bool
    doc_id: str
    content: str
    model: str
    error: str | None = None


@router.post("/groq/process", response_model=GroqProcessResponse)
async def process_with_groq(payload: GroqProcessRequest):
    try:
        import httpx

        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.get(payload.file_url)
            response.raise_for_status()
            file_content = response.text
    except Exception as exc:
        logger.error("Failed to download file from storage: %s", exc)
        return GroqProcessResponse(
            success=False,
            doc_id=payload.doc_id,
            content="",
            model="",
            error=f"Failed to download file: {exc}",
        )

    groq = GroqService()
    result = await groq.process_content(file_content)

    repo = FirebaseRepository()
    await repo._col("knowledge").document(payload.doc_id).update(
        {
            "content": result.get("content", ""),
            "status": "Embedded" if result["success"] else "Error",
            "confidence": 99 if result["success"] else 0,
            "groqModel": result.get("model", ""),
            "updated": "Just now",
        }
    )

    return GroqProcessResponse(
        success=result["success"],
        doc_id=payload.doc_id,
        content=result.get("content", ""),
        model=result.get("model", ""),
        error=result.get("error"),
    )
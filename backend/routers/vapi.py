import uuid
from typing import Any

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from backend.config import settings  # pyright: ignore[reportMissingImports]
from backend.services.vapi_service import VapiService

router = APIRouter()


class CreateAssistantRequest(BaseModel):
    business_id: str = Field(..., description="Unique business identifier")
    name: str = Field(..., description="Assistant display name")
    prompt: str = Field(..., description="System prompt for the assistant")
    tools: list[str] = Field(default_factory=list, description="Enabled tool names")
    voice_id: str = Field(default="d41b37a6-720e-4117-8e5e-2c5bc3b7d0ee", description="Vapi voice ID")
    model: str | None = Field(default=None, description="Override LLM model")


class UpdateAssistantRequest(BaseModel):
    assistant_id: str = Field(..., description="Vapi assistant ID to update")
    prompt: str | None = None
    tools: list[str] | None = None
    voice_id: str | None = None
    model: str | None = None


class AssistantResponse(BaseModel):
    assistant_id: str
    name: str
    status: str
    tools: list[str]


@router.post("/assistants", response_model=AssistantResponse)
async def create_assistant(payload: CreateAssistantRequest):
    vapi = VapiService(api_key=settings.VAPI_API_KEY)
    try:
        assistant = await vapi.create_assistant(
            business_id=payload.business_id,
            name=payload.name,
            prompt=payload.prompt,
            tools=payload.tools,
            voice_id=payload.voice_id,
            model=payload.model or settings.OPENAI_MODEL,
        )
        return AssistantResponse(
            assistant_id=assistant["id"],
            name=assistant["name"],
            status=assistant.get("status", "active"),
            tools=assistant.get("toolIds", []),
        )
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Vapi error: {exc}") from exc


@router.put("/assistants/{assistant_id}", response_model=AssistantResponse)
async def update_assistant(assistant_id: str, payload: UpdateAssistantRequest):
    if payload.assistant_id != assistant_id:
        raise HTTPException(status_code=400, detail="Path ID does not match body")
    vapi = VapiService(api_key=settings.VAPI_API_KEY)
    try:
        assistant = await vapi.update_assistant(
            assistant_id=assistant_id,
            prompt=payload.prompt,
            tools=payload.tools,
            voice_id=payload.voice_id,
            model=payload.model,
        )
        return AssistantResponse(
            assistant_id=assistant["id"],
            name=assistant["name"],
            status=assistant.get("status", "active"),
            tools=assistant.get("toolIds", []),
        )
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Vapi error: {exc}") from exc


@router.delete("/assistants/{assistant_id}")
async def delete_assistant(assistant_id: str):
    vapi = VapiService(api_key=settings.VAPI_API_KEY)
    try:
        await vapi.delete_assistant(assistant_id)
        return {"status": "deleted", "assistant_id": assistant_id}
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Vapi error: {exc}") from exc


@router.get("/assistants/{assistant_id}", response_model=AssistantResponse)
async def get_assistant(assistant_id: str):
    vapi = VapiService(api_key=settings.VAPI_API_KEY)
    try:
        assistant = await vapi.get_assistant(assistant_id)
        return AssistantResponse(
            assistant_id=assistant["id"],
            name=assistant["name"],
            status=assistant.get("status", "active"),
            tools=assistant.get("toolIds", []),
        )
    except Exception as exc:
        raise HTTPException(status_code=404, detail=f"Assistant not found: {exc}") from exc

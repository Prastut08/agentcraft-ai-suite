import logging
from typing import Any

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from backend.services.tool_registry import get_function_registry

logger = logging.getLogger(__name__)
router = APIRouter()
registry = get_function_registry()


class ToolExecuteRequest(BaseModel):
    business_id: str = Field(..., description="Business identifier")
    tool: str = Field(..., description="Tool name to execute")
    arguments: dict[str, Any] = Field(default_factory=dict, description="Tool arguments")


class ToolExecuteResponse(BaseModel):
    business_id: str
    tool: str
    result: Any
    error: str | None = None


@router.post("/execute", response_model=ToolExecuteResponse)
async def execute_tool(payload: ToolExecuteRequest):
    try:
        result = await registry.execute(payload.tool, payload.arguments)
        return ToolExecuteResponse(
            business_id=payload.business_id,
            tool=payload.tool,
            result=result,
        )
    except ValueError as exc:
        logger.error("Tool execution failed: %s", exc)
        return ToolExecuteResponse(
            business_id=payload.business_id,
            tool=payload.tool,
            result=None,
            error=str(exc),
        )
    except TypeError as exc:
        logger.error("Invalid arguments for tool %s: %s", payload.tool, exc)
        raise HTTPException(status_code=400, detail=f"Invalid arguments: {exc}") from exc
    except Exception as exc:
        logger.exception("Unexpected error executing tool %s", payload.tool)
        raise HTTPException(status_code=500, detail="Tool execution failed") from exc


@router.get("/list")
async def list_tools():
    return {"tools": registry.list_tools()}

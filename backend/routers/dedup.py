from typing import Any

from fastapi import APIRouter
from pydantic import BaseModel, Field

from backend.repositories.firebase_repo import FirebaseRepository  # pyright: ignore[reportMissingImports]

router = APIRouter()


class DedupRequest(BaseModel):
    collection: str = Field(..., description="Firestore collection name")
    dedup_keys: list[str] = Field(
        ...,
        description="List of field names to use as dedup keys",
        min_length=1,
    )


class DedupResponse(BaseModel):
    collection: str
    dedup_keys: list[str]
    total_documents: int
    duplicate_groups: int
    total_removed: int
    details: list[dict[str, Any]]


@router.post("/dedup", response_model=DedupResponse)
async def remove_duplicates(payload: DedupRequest):
    repo = FirebaseRepository()
    result = await repo.remove_duplicates(
        collection_name=payload.collection,
        dedup_keys=payload.dedup_keys,
    )
    return DedupResponse(**result)
import logging
from collections import defaultdict
from datetime import datetime
from typing import Any, Optional

from google.cloud import firestore as gc_firestore

from backend.config import settings  # pyright: ignore[reportMissingImports]

logger = logging.getLogger(__name__)


class FirebaseRepository:
    def __init__(self) -> None:
        self._db = gc_firestore.Client(project=settings.FIREBASE_DATABASE_URL)
        self.collections = {
            "businesses": "businesses",
            "agents": "agents",
            "customers": "customers",
            "calls": "calls",
            "appointments": "appointments",
            "analytics": "analytics",
            "logs": "logs",
            "knowledge": "knowledge",
        }

    def _col(self, name: str):
        return self._db.collection(self.collections[name])

    async def create_business(self, data: dict[str, Any]) -> str:
        doc_ref = self._col("businesses").document()
        doc_ref.set({**data, "createdAt": datetime.utcnow(), "updatedAt": datetime.utcnow()})
        logger.info("Created business %s", doc_ref.id)
        return doc_ref.id

    async def get_business(self, business_id: str) -> dict[str, Any] | None:
        doc = self._col("businesses").document(business_id).get()
        return doc.to_dict() if doc.exists else None

    async def create_agent(self, business_id: str, data: dict[str, Any]) -> str:
        doc_ref = self._col("agents").document()
        doc_ref.set(
            {
                **data,
                "businessId": business_id,
                "createdAt": datetime.utcnow(),
                "updatedAt": datetime.utcnow(),
            }
        )
        logger.info("Created agent %s for business %s", doc_ref.id, business_id)
        return doc_ref.id

    async def list_agents(self, business_id: str) -> list[dict[str, Any]]:
        docs = self._col("agents").where("businessId", "==", business_id).stream()
        return [{**(doc.to_dict() or {}), "id": doc.id} for doc in docs]

    async def create_call(self, business_id: str, data: dict[str, Any]) -> str:
        doc_ref = self._col("calls").document()
        doc_ref.set(
            {
                **data,
                "businessId": business_id,
                "createdAt": datetime.utcnow(),
            }
        )
        logger.info("Logged call %s for business %s", doc_ref.id, business_id)
        return doc_ref.id

    async def create_appointment(self, business_id: str, data: dict[str, Any]) -> str:
        doc_ref = self._col("appointments").document()
        doc_ref.set(
            {
                **data,
                "businessId": business_id,
                "createdAt": datetime.utcnow(),
                "updatedAt": datetime.utcnow(),
            }
        )
        logger.info("Created appointment %s", doc_ref.id)
        return doc_ref.id

    async def list_appointments(self, business_id: str) -> list[dict[str, Any]]:
        docs = (
            self._col("appointments")
            .where("businessId", "==", business_id)
            .order_by("date")
            .stream()
        )
        return [{**(doc.to_dict() or {}), "id": doc.id} for doc in docs]

    async def create_customer(self, business_id: str, data: dict[str, Any]) -> str:
        doc_ref = self._col("customers").document()
        doc_ref.set(
            {
                **data,
                "businessId": business_id,
                "createdAt": datetime.utcnow(),
                "updatedAt": datetime.utcnow(),
            }
        )
        return doc_ref.id

    async def get_customer(self, business_id: str, phone: str) -> Optional[dict[str, Any]]:
        docs = (
            self._col("customers")
            .where("businessId", "==", business_id)
            .where("phone", "==", phone)
            .stream()
        )
        for doc in docs:
            return {**(doc.to_dict() or {}), "id": doc.id}
        return None

    async def log_analytics(self, business_id: str, data: dict[str, Any]) -> None:
        self._col("analytics").add(
            {
                **data,
                "businessId": business_id,
                "createdAt": datetime.utcnow(),
            }
        )

    async def create_log(self, business_id: str, data: dict[str, Any]) -> str:
        doc_ref = self._col("logs").document()
        doc_ref.set(
            {
                **data,
                "businessId": business_id,
                "createdAt": datetime.utcnow(),
            }
        )
        return doc_ref.id

    async def add_knowledge(self, business_id: str, data: dict[str, Any]) -> str:
        doc_ref = self._col("knowledge").document()
        doc_ref.set(
            {
                **data,
                "businessId": business_id,
                "createdAt": datetime.utcnow(),
            }
        )
        return doc_ref.id

    async def remove_duplicates(
        self,
        collection_name: str,
        dedup_keys: list[str],
    ) -> dict[str, Any]:
        docs = list(self._col(collection_name).stream())
        groups: dict[str, list[str]] = defaultdict(list)
        for doc in docs:
            data = doc.to_dict() or {}
            key = tuple(data.get(k) for k in dedup_keys)
            groups[key].append(doc.id)

        total_removed = 0
        removed_per_group: list[dict[str, Any]] = []
        for key, doc_ids in groups.items():
            if len(doc_ids) <= 1:
                continue
            keeper = doc_ids[0]
            for duplicate_id in doc_ids[1:]:
                self._col(collection_name).document(duplicate_id).delete()
                total_removed += 1
            removed_per_group.append(
                {
                    "key": {k: v for k, v in zip(dedup_keys, key)},
                    "kept": keeper,
                    "removed": doc_ids[1:],
                }
            )

        result: dict[str, Any] = {
            "collection": collection_name,
            "dedup_keys": dedup_keys,
            "total_documents": len(docs),
            "duplicate_groups": len(removed_per_group),
            "total_removed": total_removed,
            "details": removed_per_group,
        }
        logger.info("Dedup result for %s: %d removed", collection_name, total_removed)
        return result

import logging
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

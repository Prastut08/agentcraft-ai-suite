import logging
from typing import Any

import httpx
from firebase_admin import firestore
from firebase_admin.firestore import SERVER_TIMESTAMP  # pyright: ignore[reportAttributeAccessIssue]

from backend.config import settings  # pyright: ignore[reportMissingImports]

logger = logging.getLogger(__name__)


class VapiService:
    def __init__(self, api_key: str | None = None) -> None:
        self.api_key = api_key or settings.VAPI_API_KEY
        self.base_url = "https://api.vapi.ai/v1"
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }
        self._db = firestore.client()

    async def _request(self, method: str, path: str, payload: dict[str, Any] | None = None) -> dict[str, Any]:
        async with httpx.AsyncClient(timeout=settings.VAPI_ASSISTANT_TIMEOUT) as client:
            url = f"{self.base_url}/{path.lstrip('/')}"
            response = await client.request(method, url, json=payload, headers=self.headers)
            response.raise_for_status()
            return response.json()

    def _to_vapi_tools(self, tool_names: list[str]) -> list[dict[str, Any]]:
        tool_map: dict[str, dict[str, Any]] = {
            "book_table": {
                "type": "function",
                "function": {
                    "name": "book_table",
                    "description": "Book a table at the restaurant",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "date": {"type": "string", "description": "Booking date"},
                            "time": {"type": "string", "description": "Booking time"},
                            "party_size": {"type": "integer", "description": "Number of guests"},
                            "name": {"type": "string", "description": "Customer name"},
                        },
                        "required": ["date", "time", "party_size", "name"],
                    },
                },
            },
            "cancel_reservation": {
                "type": "function",
                "function": {
                    "name": "cancel_reservation",
                    "description": "Cancel an existing reservation",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "reservation_id": {"type": "string", "description": "Reservation ID"},
                            "name": {"type": "string", "description": "Customer name"},
                        },
                        "required": ["reservation_id", "name"],
                    },
                },
            },
            "faq_search": {
                "type": "function",
                "function": {
                    "name": "faq_search",
                    "description": "Search frequently asked questions",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "query": {"type": "string", "description": "Search query"},
                        },
                        "required": ["query"],
                    },
                },
            },
            "create_appointment": {
                "type": "function",
                "function": {
                    "name": "create_appointment",
                    "description": "Create a new appointment at the clinic",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "patient_name": {"type": "string"},
                            "date": {"type": "string"},
                            "time": {"type": "string"},
                            "reason": {"type": "string"},
                        },
                        "required": ["patient_name", "date", "time", "reason"],
                    },
                },
            },
            "update_appointment": {
                "type": "function",
                "function": {
                    "name": "update_appointment",
                    "description": "Update an existing appointment",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "appointment_id": {"type": "string"},
                            "new_date": {"type": "string"},
                            "new_time": {"type": "string"},
                        },
                        "required": ["appointment_id"],
                    },
                },
            },
            "patient_lookup": {
                "type": "function",
                "function": {
                    "name": "patient_lookup",
                    "description": "Look up patient details",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "patient_id": {"type": "string"},
                            "phone": {"type": "string"},
                        },
                        "required": ["patient_id"],
                    },
                },
            },
            "book_appointment": {
                "type": "function",
                "function": {
                    "name": "book_appointment",
                    "description": "Book an appointment at the salon",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "service": {"type": "string"},
                            "stylist": {"type": "string"},
                            "date": {"type": "string"},
                            "time": {"type": "string"},
                            "customer_name": {"type": "string"},
                        },
                        "required": ["service", "date", "time", "customer_name"],
                    },
                },
            },
            "stylist_selection": {
                "type": "function",
                "function": {
                    "name": "stylist_selection",
                    "description": "Get available stylists for a service",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "service": {"type": "string"},
                            "date": {"type": "string"},
                        },
                        "required": ["service"],
                    },
                },
            },
        }

        return [tool_map[name] for name in tool_names if name in tool_map]

    async def create_assistant(
        self,
        business_id: str,
        name: str,
        prompt: str,
        tools: list[str],
        voice_id: str,
        model: str,
    ) -> dict[str, Any]:
        payload = {
            "name": name,
            "model": model,
            "voice": {"provider": "vapi", "voiceId": voice_id},
            "transcriber": {"provider": "deepgram", "model": "nova-2", "language": "en-US"},
            "firstMessage": "Hello! How can I help you today?",
            "systemMessage": prompt,
            "toolIds": tools,
            "metadata": {"businessId": business_id},
        }

        data = await self._request("POST", "/assistants", payload)
        assistant_id = data.get("id")
        if assistant_id:
            await self._save_assistant_ref(business_id, assistant_id, name, tools)
        return data

    async def update_assistant(
        self,
        assistant_id: str,
        prompt: str | None,
        tools: list[str] | None,
        voice_id: str | None,
        model: str | None,
    ) -> dict[str, Any]:
        payload: dict[str, Any] = {}
        if prompt:
            payload["systemMessage"] = prompt
        if tools is not None:
            payload["toolIds"] = tools
        if voice_id:
            payload["voice"] = {"provider": "vapi", "voiceId": voice_id}
        if model:
            payload["model"] = model

        return await self._request("PATCH", f"/assistants/{assistant_id}", payload)

    async def delete_assistant(self, assistant_id: str) -> dict[str, Any]:
        return await self._request("DELETE", f"/assistants/{assistant_id}")

    async def get_assistant(self, assistant_id: str) -> dict[str, Any]:
        return await self._request("GET", f"/assistants/{assistant_id}")

    async def sync_assistant(self, business_id: str, assistant_id: str) -> dict[str, Any]:
        remote = await self.get_assistant(assistant_id)
        await self._save_assistant_ref(
            business_id,
            assistant_id,
            remote.get("name", ""),
            remote.get("toolIds", []),
        )
        return remote

    async def register_tools(self, assistant_id: str, tool_names: list[str]) -> dict[str, Any]:
        vapi_tools = self._to_vapi_tools(tool_names)
        return await self._request("POST", f"/assistants/{assistant_id}/tools", {"tools": vapi_tools})

    async def update_prompt(self, assistant_id: str, prompt: str) -> dict[str, Any]:
        return await self._request("PATCH", f"/assistants/{assistant_id}", {"systemMessage": prompt})

    async def _save_assistant_ref(
        self, business_id: str, assistant_id: str, name: str, tools: list[str]
    ) -> None:
        try:
            self._db.collection("assistants").document(assistant_id).set(
                {
                    "businessId": business_id,
                    "assistantId": assistant_id,
                    "name": name,
                    "tools": tools,
                    "syncedAt": SERVER_TIMESTAMP,
                },
                merge=True,
            )
        except Exception as exc:
            logger.error("Failed to save assistant ref: %s", exc)

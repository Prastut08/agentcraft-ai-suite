import logging
from datetime import datetime
from typing import Any

from backend.services.tool_registry import FUNCTION_REGISTRY

logger = logging.getLogger(__name__)


@FUNCTION_REGISTRY.register("book_table")
async def book_table(
    date: str,
    time: str,
    party_size: int,
    name: str,
) -> dict[str, Any]:
    reservation_id = f"RES-{datetime.utcnow().strftime('%Y%m%d%H%M%S')}"
    logger.info("Booked table for %s on %s at %s", name, date, time)
    return {
        "status": "booked",
        "reservation_id": reservation_id,
        "date": date,
        "time": time,
        "party_size": party_size,
        "name": name,
    }


@FUNCTION_REGISTRY.register("cancel_reservation")
async def cancel_reservation(
    reservation_id: str,
    name: str,
) -> dict[str, Any]:
    logger.info("Cancelling reservation %s for %s", reservation_id, name)
    return {
        "status": "cancelled",
        "reservation_id": reservation_id,
        "name": name,
    }


@FUNCTION_REGISTRY.register("faq_search")
async def faq_search(query: str) -> dict[str, Any]:
    logger.info("Searching FAQ for: %s", query)
    return {
        "query": query,
        "results": [
            {"question": "What are your hours?", "answer": "We are open 9am to 10pm daily."},
            {"question": "Do you take reservations?", "answer": "Yes, we accept reservations online or by phone."},
        ],
    }


@FUNCTION_REGISTRY.register("create_appointment")
async def create_appointment(
    patient_name: str,
    date: str,
    time: str,
    reason: str,
) -> dict[str, Any]:
    appointment_id = f"APT-{datetime.utcnow().strftime('%Y%m%d%H%M%S')}"
    logger.info("Created appointment for %s on %s at %s", patient_name, date, time)
    return {
        "status": "created",
        "appointment_id": appointment_id,
        "patient_name": patient_name,
        "date": date,
        "time": time,
        "reason": reason,
    }


@FUNCTION_REGISTRY.register("update_appointment")
async def update_appointment(
    appointment_id: str,
    new_date: str | None = None,
    new_time: str | None = None,
) -> dict[str, Any]:
    logger.info("Updating appointment %s to %s %s", appointment_id, new_date, new_time)
    return {
        "status": "updated",
        "appointment_id": appointment_id,
        "new_date": new_date,
        "new_time": new_time,
    }


@FUNCTION_REGISTRY.register("patient_lookup")
async def patient_lookup(
    patient_id: str,
    phone: str | None = None,
) -> dict[str, Any]:
    logger.info("Looking up patient %s", patient_id)
    return {
        "patient_id": patient_id,
        "name": "Jane Doe",
        "phone": phone or "+1 (555) 000-0000",
        "status": "active",
    }


@FUNCTION_REGISTRY.register("book_appointment")
async def book_appointment(
    service: str,
    date: str,
    time: str,
    customer_name: str,
    stylist: str | None = None,
) -> dict[str, Any]:
    appointment_id = f"SAL-{datetime.utcnow().strftime('%Y%m%d%H%M%S')}"
    logger.info("Booked salon appointment for %s: %s on %s", customer_name, service, date)
    return {
        "status": "booked",
        "appointment_id": appointment_id,
        "service": service,
        "stylist": stylist or "Any available",
        "date": date,
        "time": time,
        "customer_name": customer_name,
    }


@FUNCTION_REGISTRY.register("stylist_selection")
async def stylist_selection(
    service: str,
    date: str | None = None,
) -> dict[str, Any]:
    logger.info("Finding stylists for %s", service)
    return {
        "service": service,
        "available_stylists": ["Alice", "Bob", "Charlie"],
        "date": date,
    }

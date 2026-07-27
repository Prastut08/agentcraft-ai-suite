import logging
from typing import Any

from fastapi import Request
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.responses import Response

logger = logging.getLogger(__name__)


class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Response:
        path = request.url.path
        if path in ("/health", "/docs", "/openapi.json"):
            return await call_next(request)

        auth_header = request.headers.get("Authorization", "")
        if not auth_header.startswith("Bearer "):
            return JSONResponse(status_code=401, content={"detail": "Missing or invalid authorization header"})

        token = auth_header.split(" ", 1)[1]
        try:
            from firebase_admin import auth as firebase_auth
            decoded = firebase_auth.verify_id_token(token)
            request.state.user = decoded
        except Exception as exc:
            logger.warning("Auth failed: %s", exc)
            return JSONResponse(status_code=401, content={"detail": "Invalid or expired token"})

        return await call_next(request)

import time
from contextlib import asynccontextmanager
from typing import Any

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from loguru import logger

from backend.config import settings  # pyright: ignore[reportMissingImports]
from backend.core.logging import setup_logging  # pyright: ignore[reportMissingImports]
from backend.middleware.auth import AuthMiddleware  # pyright: ignore[reportMissingImports]
from backend.routers import dedup, knowledge, tools, vapi  # pyright: ignore[reportMissingImports]

setup_logging(settings.LOG_LEVEL)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting VoiceForge AI backend")
    logger.info("Environment: {}", settings.ENV)
    logger.info("Log level: {}", settings.LOG_LEVEL)
    yield
    logger.info("Shutting down VoiceForge AI backend")


app = FastAPI(
    title="VoiceForge AI",
    description="Voice AI infrastructure with Vapi, LLM, and dynamic tool calling",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(AuthMiddleware)  # pyright: ignore[reportCallIssue,reportArgumentType]


@app.middleware("http")
async def log_requests(request: Request, call_next):
    start = time.perf_counter()
    response = await call_next(request)
    elapsed = time.perf_counter() - start
    logger.info(
        "{} {} completed in {:.3f}s with status {}",
        request.method,
        request.url.path,
        elapsed,
        response.status_code,
    )
    return response


@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    logger.exception("Unhandled exception on {}", request.url.path)
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"},
    )


app.include_router(vapi.router, prefix="/api/vapi", tags=["vapi"])
app.include_router(dedup.router, prefix="/api/dedup", tags=["dedup"])
app.include_router(knowledge.router, prefix="/api/knowledge", tags=["knowledge"])
app.include_router(tools.router, prefix="/api/tools", tags=["tools"])


@app.get("/health", tags=["health"])
async def health_check() -> dict[str, Any]:
    return {"status": "healthy", "env": settings.ENV, "version": "1.0.0"}

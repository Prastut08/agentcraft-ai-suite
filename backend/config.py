from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    HOST: str = "0.0.0.0"
    PORT: int = 8000
    ENV: str = "development"
    LOG_LEVEL: str = "INFO"

    FIREBASE_CREDENTIALS_PATH: Path = Path("./serviceAccountKey.json")
    FIREBASE_DATABASE_URL: str = ""

    VAPI_API_KEY: str
    VAPI_ASSISTANT_TIMEOUT: int = 30

    OPENAI_API_KEY: str
    OPENAI_MODEL: str = "gpt-4o-mini"
    OPENAI_TEMPERATURE: float = 0.7
    OPENAI_MAX_TOKENS: int = 1024

    GROQ_API_KEY: str = ""
    GROQ_MODEL: str = "llama-3.3-70b-versatile"


settings = Settings()

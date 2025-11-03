from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    DATABASE_URL: str
    JWT_SECRET: str
    JWT_ALG: str = "HS256"
    ACCESS_TOKEN_MINUTES: int = 15
    REFRESH_TOKEN_DAYS: int = 7
    BACKEND_CORS_ORIGINS: str = "http://localhost:5173"

    class Config:
        env_file = "../.env"


settings = Settings()

ALLOWED_ORIGINS: List[str] = [
    o.strip() for o in settings.BACKEND_CORS_ORIGINS.split(",") if o.strip()
]

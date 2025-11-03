from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from passlib.context import CryptContext
from .config import settings

# Prefer argon2 (no 72-byte limit); keep bcrypt for legacy
pwd_context = CryptContext(
    schemes=["argon2", "bcrypt_sha256", "bcrypt"],
    deprecated="auto",
)

def hash_password(p: str) -> str:
    return pwd_context.hash(p)  # defaults to first scheme ("argon2")

def verify_password(p: str, hashed: str) -> bool:
    return pwd_context.verify(p, hashed)

def _create_token(sub: str, expires_delta: timedelta) -> str:
    now = datetime.now(timezone.utc)
    payload = {"sub": sub, "iat": int(now.timestamp()), "exp": int((now + expires_delta).timestamp())}
    return jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALG)

def create_access_token(sub: str) -> str:
    return _create_token(sub, timedelta(minutes=settings.ACCESS_TOKEN_MINUTES))

def create_refresh_token(sub: str) -> str:
    return _create_token(sub, timedelta(days=settings.REFRESH_TOKEN_DAYS))

def decode_token(token: str) -> str | None:
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALG])
        return payload.get("sub")
    except JWTError:
        return None


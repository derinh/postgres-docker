from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import ALLOWED_ORIGINS
from .database import engine
from .models import Base
from .routers import auth, users


app = FastAPI(title="App API")

# Enable CORS (Cross-Origin Resource Sharing)
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Minimal: auto-create tables on startup (use Alembic in real apps)
Base.metadata.create_all(bind=engine)

# Include route groups
app.include_router(auth.router)
app.include_router(users.router)


@app.get("/health")
def health():
    return {"ok": True}


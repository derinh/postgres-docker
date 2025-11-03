from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from .config import settings


# Create the database engine
engine = create_engine(settings.DATABASE_URL, pool_pre_ping=True)

# Session factory for database operations
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)


# Base class for SQLAlchemy models
class Base(DeclarativeBase):
    pass

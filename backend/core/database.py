from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from .config import (POSTGRES_USER,
                     POSTGRES_PASSWORD,
                     POSTGRES_DB,
                     POSTGRES_HOST,
                     POSTGRES_PORT,)

DATABASE_URL = f"postgresql+asyncpg://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}"

# Create an async engine
engine = create_async_engine(DATABASE_URL, echo=True)

# Create an async session factory
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# Create a base model for ORM classes
Base = declarative_base()

# Dependency to get an async DB session
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
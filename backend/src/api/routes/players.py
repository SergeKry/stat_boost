from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from core.database import get_db

router = APIRouter()

@router.post("/")
async def create_player(db: AsyncSession = Depends(get_db)):
    pass

@router.get("/")
async def get_players(db: AsyncSession = Depends(get_db)):
    pass

@router.get("/{player_id}")
async def get_player(db: AsyncSession = Depends(get_db)):
    pass

@router.delete("/{player_id}")
async def delete_player(db: AsyncSession = Depends(get_db)):
    pass
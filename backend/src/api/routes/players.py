from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from core.database import get_db
from schemas.players import PlayerCreate, PlayerResponse
from services.players import PlayerService as Service

router = APIRouter()

@router.post("/", response_model=PlayerResponse)
async def create_player(player: PlayerCreate, db: AsyncSession = Depends(get_db)) -> PlayerResponse:
    new_player = await Service().create_player(db, player)
    return new_player

@router.get("/", response_model=List[PlayerResponse])
async def get_players(db: AsyncSession = Depends(get_db)):
    players = await Service().get_players(db)
    return players

@router.get("/{player_id}", response_model=PlayerResponse)
async def get_player(player_id: int, db: AsyncSession = Depends(get_db)) -> PlayerResponse:
    player = await Service().get_player(db, player_id)
    return player

@router.delete("/{player_id}")
async def delete_player(player_id: int, db: AsyncSession = Depends(get_db)):
    message = await Service().delete_player(db, player_id)
    return message
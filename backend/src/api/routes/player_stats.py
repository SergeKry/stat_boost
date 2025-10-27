from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional, List, Dict
from core.database import get_db
from schemas.player_stats import PlayerStatsSchema
from services.player_stats import PlayerStatsService as Service


router = APIRouter()

@router.post("/{wg_player_id}")
async def update_player_stats(wg_player_id: int, db: AsyncSession = Depends(get_db)):
    """Update Player's Statistics"""
    updated_stats = await Service(db).update_player_stats(wg_player_id)
    return {"updated_stats": updated_stats}


@router.get("/{wg_player_id}", response_model=Dict[int, List[PlayerStatsSchema]])
async def get_player_stats(
    wg_player_id: int,
    actual: Optional[bool] = Query(None),
    db: AsyncSession = Depends(get_db)
    ):
    """Get Player's Statistic"""
    player_stats = await Service(db).get_player_stats(wg_player_id, actual)
    formatted_stats = {wg_player_id: [PlayerStatsSchema(**stat.__dict__) for stat in player_stats]}
    return formatted_stats
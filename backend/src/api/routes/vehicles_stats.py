from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from core.database import get_db
from services.vehicles_stats import VehiclesStatsService as Service

router = APIRouter()

@router.post("/{wg_player_id}")
async def update_vehicles_stats(wg_player_id: int, db: AsyncSession = Depends(get_db)):
    updated_vehicles = await Service().update_vehicles_stats(wg_player_id, db)
    return {"updated_vehicles": updated_vehicles}

@router.get("/{wg_player_id}", response_model=None)
async def get_vehicles_stats(wg_player_id: int, db: AsyncSession = Depends(get_db)):
    pass
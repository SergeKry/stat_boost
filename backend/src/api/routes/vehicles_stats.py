from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Dict
from core.database import get_db
from services.vehicles_stats import VehiclesStatsService as Service
from schemas.vehicles_stats import VehicleStatsSchema

router = APIRouter()

@router.post("/{wg_player_id}")
async def update_vehicles_stats(wg_player_id: int, db: AsyncSession = Depends(get_db)):
    updated_vehicles = await Service().update_vehicles_stats(wg_player_id, db)
    return {"updated_vehicles": updated_vehicles}

@router.get("/{wg_player_id}", response_model=Dict[int, List[VehicleStatsSchema]])
async def get_vehicles_stats(wg_player_id: int, db: AsyncSession = Depends(get_db)):
    vehicles_statistics = await Service().get_vehicles_stats(wg_player_id, db)
    fromatted_stats = {wg_player_id: [VehicleStatsSchema(**stat.__dict__) for stat in vehicles_statistics]}
    return fromatted_stats
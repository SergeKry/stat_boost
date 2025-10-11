from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Dict, Optional
from core.database import get_db
from services.vehicles_stats import VehiclesStatsService as Service
from schemas.vehicles_stats import VehicleStatsSchema

router = APIRouter()

@router.post("/{wg_player_id}")
async def update_vehicles_stats(wg_player_id: int, db: AsyncSession = Depends(get_db)):
    """
    Update vehicle stats for a given player
    """
    updated_vehicles = await Service().update_vehicles_stats(wg_player_id, db)
    return {"updated_vehicles": updated_vehicles}


@router.get("/{wg_player_id}", response_model=Dict[int, List[VehicleStatsSchema]])
async def get_vehicles_stats(
    wg_player_id: int,
    actual: Optional[bool] = Query(None),
    tank_id: Optional[int] = Query(None),
    db: AsyncSession = Depends(get_db)
    ):
    """
    Get vehicle stats for a given player
    """
    vehicles_statistics = await Service().get_vehicles_stats(wg_player_id=wg_player_id, actual=actual, tank_id=tank_id, db=db)
    fromatted_stats = {wg_player_id: [VehicleStatsSchema(**stat.__dict__) for stat in vehicles_statistics]}
    return fromatted_stats
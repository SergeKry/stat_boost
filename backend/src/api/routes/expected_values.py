from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from core.database import get_db
from services.expected_values import ExpectedValuesService as Service
from schemas.expected_values import TankResponse

router = APIRouter()

@router.post("/")
async def update_expected(db: AsyncSession = Depends(get_db)):
    """Triggers data collection from wargaming API"""
    exp_values = await Service().update_expected_values(db)
    return exp_values

@router.get("/", response_model=list[TankResponse])
async def get_expected(db: AsyncSession = Depends(get_db)):
    """Returns list of tanks in db and their expected values"""
    return await Service().return_all_tanks(db)
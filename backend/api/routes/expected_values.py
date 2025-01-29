from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from core.database import get_db
from services.expected_values import ExpectedValuesService as Service

router = APIRouter()

@router.post("/update-expected")
async def update_expected(db: AsyncSession = Depends(get_db)):
    """Triggers data collection from wargaming API"""
    exp_values = await Service.collect_values()
    return exp_values
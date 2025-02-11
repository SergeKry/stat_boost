from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from core.database import get_db
from services.expected_values import ExpectedValuesService as Service
from schemas.expected_values import PaginatedTanksResponse

router = APIRouter()

@router.post("/")
async def update_expected(db: AsyncSession = Depends(get_db)):
    """Triggers data collection from wargaming API"""
    tanks_updated = await Service().update_expected_values(db)
    return {"message": tanks_updated}

@router.get("/", response_model=PaginatedTanksResponse)
async def get_expected(
    page: int = Query(1, ge=1),
    limit: int = Query(2000),
    sort_by: str = Query("wg_tank_id"),
    order: str = Query("asc"),
    search: str = Query(None),
    db: AsyncSession = Depends(get_db),
    ):
    """Returns list of tanks in db and their expected values"""
    return await Service().return_all_tanks(db, page, limit, sort_by, order, search)
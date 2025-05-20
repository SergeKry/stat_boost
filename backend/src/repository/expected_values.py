from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from models.expected_values import Tank

class ExpectedValuesRepository:
    """Class to perform operations with database Tank model"""

    async def get_values_by_wg_id(self, db: AsyncSession, wg_tank_id: int):
        """Get expected stats for a given tank from DB"""
        query = select(Tank).where(Tank.wg_tank_id == wg_tank_id)
        result = await db.execute(query)
        return result.scalars().first()
from typing import Optional, List
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession
from models.player_stats import PlayerStats

class PlayerStatsRepository:
    def __init__(self, session: AsyncSession):
        self.session = session
    
    async def get_actual(self, wg_player_id: int) -> Optional[PlayerStats]:
        q = select(PlayerStats).where(
            PlayerStats.wg_player_id == wg_player_id,
            PlayerStats.is_actual.is_(True),
        ).limit(1)
        return (await self.session.execute(q)).scalars().first()

    async def list(
        self, wg_player_id: int, is_actual: Optional[bool]
    ) -> List[PlayerStats]:
        q = select(PlayerStats).where(PlayerStats.wg_player_id == wg_player_id)
        if is_actual is not None:
            q = q.where(PlayerStats.is_actual.is_(is_actual))
        q = q.order_by(PlayerStats.created_at.desc())
        return list((await self.session.execute(q)).scalars().all())

    async def mark_not_actual(self, stat: PlayerStats) -> int:
        """
        Mark a specific PlayerStats record as not actual and persist the change.
        Returns the number of affected rows (should be 1 on success).
        """

        stat.is_actual = False
        self.session.add(stat)
        await self.session.flush()
        return 1


    async def create(
        self,
        *,
        wg_player_id: int,
        computed_battles: int,
        player_battles: int,
        wn8: int,
        is_actual: bool = True,
    ) -> PlayerStats:
        obj = PlayerStats(
            wg_player_id=wg_player_id,
            computed_battles=computed_battles,
            player_battles=player_battles,
            wn8=wn8,
            is_actual=is_actual,
        )
        self.session.add(obj)
        await self.session.flush()  # get obj.id
        return obj
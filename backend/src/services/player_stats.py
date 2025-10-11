from sqlalchemy.ext.asyncio import AsyncSession
from repository.player_stats import PlayerStatsRepository
from services.wg_player import WgPlayerIdService as WgPlayerService
from services.vehicles_stats import VehiclesStatsService
from utils.wn8_utils import calculate_players_wn8

class PlayerStatsService:
    """
    Service that handles calculating player statistics.
     - Update player statistics
     - Get player statistics
    """
    def __init__(self, session: AsyncSession):
        self.session = session
        self.repo = PlayerStatsRepository(session)
        self.wg_player_service = WgPlayerService()
        self.vehicle_service = VehiclesStatsService()

    async def update_player_stats(self, wg_player_id: int):
        """
        Update player statistics and  set the old record as is_active=False.
        Creates a new DB entry if player number of battles is different from the old one.
        """
        latest_stat = await self.repo.get_actual(wg_player_id)
        player_battles = await self.wg_player_service.get_player_battles(wg_player_id)
        if latest_stat and not player_battles:
            player_battles = latest_stat.player_battles

        if not latest_stat or latest_stat.player_battles != player_battles:
            player_vehicles_stats = await self.vehicle_service.get_vehicles_stats(
                wg_player_id=wg_player_id,
                actual=True,
                db=self.session,
            )
            wn8, computed_battles = await calculate_players_wn8(player_vehicles_stats)
            
            if latest_stat:
                await self.repo.mark_not_actual(latest_stat)
            latest_stat = await self.repo.create(
                wg_player_id = wg_player_id,
                computed_battles = computed_battles,
                player_battles = player_battles,
                wn8 = wn8,
            )
            await self.session.commit()
        return latest_stat

    async def get_player_stats(self, wg_player_id: int):
        pass
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from services.expected_values import ExpectedValuesService
from services.players import PlayerService
from services.player_stats import PlayerStatsService
from services.vehicles_stats import VehiclesStatsService
from core.database import AsyncSessionLocal

async def cron_update_expected_values():
    async with AsyncSessionLocal() as db:
        await ExpectedValuesService().update_expected_values(db)

async def cron_update_players_vehicles_stats():
    async with AsyncSessionLocal() as db:
        players = await PlayerService().get_players(db)
        for player in players:
            await VehiclesStatsService().update_vehicles_stats(player.wg_player_id, db)

async def cron_update_players_stats():
    async with AsyncSessionLocal() as db:
        players = await PlayerService().get_players(db)
        for player in players:
            await PlayerStatsService(db).update_player_stats(player.wg_player_id)

def start_scheduler():
    scheduler = AsyncIOScheduler()
    scheduler.add_job(cron_update_expected_values, CronTrigger(hour=0, minute=0))
    scheduler.add_job(cron_update_players_vehicles_stats, CronTrigger(hour=0, minute=0))
    scheduler.add_job(cron_update_players_stats, CronTrigger(hour=0, minute=0))
    scheduler.start()
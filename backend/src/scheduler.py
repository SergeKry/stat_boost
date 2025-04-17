from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from services.expected_values import ExpectedValuesService as Service
from core.database import AsyncSessionLocal

async def cron_update_expected_values():
    async with AsyncSessionLocal() as db:
        await Service().update_expected_values(db)

def start_scheduler():
    scheduler = AsyncIOScheduler()
    scheduler.add_job(cron_update_expected_values, CronTrigger(hour=0, minute=0))
    scheduler.start()
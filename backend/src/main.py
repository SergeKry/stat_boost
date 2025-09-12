from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from core.database import get_db
from api.routes import (healthcheck,
                        expected_values,
                        wg_player,
                        players,
                        vehicles_stats,)
from scheduler import start_scheduler, cron_update_expected_values, cron_update_players_vehicles_stats

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Change this to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allows GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],  # Allows all headers
)

app.include_router(healthcheck.router, prefix="/healthcheck", tags=["Healthcheck"])
app.include_router(expected_values.router, prefix="/expected-values", tags=["Expected Values"])
app.include_router(wg_player.router, prefix="/wg_player", tags=["WG Player ID"])
app.include_router(players.router, prefix="/players", tags=["Players"])
app.include_router(vehicles_stats.router, prefix="/vehicles-stats", tags=["Vehicles Stats"])

@app.on_event("startup")
async def startup_event():
    await cron_update_expected_values()
    await cron_update_players_vehicles_stats()
    start_scheduler()
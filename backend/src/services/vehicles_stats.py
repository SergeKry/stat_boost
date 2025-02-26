import httpx
from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from core.config import WARGAMING_API_KEY
from models.expected_values import Tank
from models.vehicles_stats import VehiclesStats
from models.players import Player

class VehiclesStatsService:
    """
    Service that handles calculating statistics for vehicles/tanks of given user.
     - Fetch statistics data from WG API
     - Calculate statistics value based on API data and Expected values from DB
     - Save vehicles statistics to database
     - Get the list of actual statistics for each player's vehicle
    """
    vehicle_stats_url = "https://api.worldoftanks.eu/wot/tanks/stats/"
    params ={
        'application_id': WARGAMING_API_KEY,
    }
    
    async def collect_vehicles_data(self, wg_player_id: int) -> list:
        """Fetch vehicles data for a given player from WG API"""
        url = self.vehicle_stats_url
        params = self.params
        params.update({
            "account_id": wg_player_id,
            "extra": "random",
            "fields": "random, tank_id"
            })
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(url, params=params)
                response.raise_for_status()

                response_data = response.json()
                if "data" not in response_data:
                    raise HTTPException(status_code=500, detail=response_data)
                return response_data["data"][str(wg_player_id)]

        except httpx.HTTPStatusError as e:
            return {"error": f"HTTP error: {e.response.status_code}"}
        except httpx.RequestError as e:
            return {"error": f"Request error: {str(e)}"}
        
    async def calculate_avg_values(self, tank_item: dict):
        """Calculate avg values for a given tank from API data"""
        data = tank_item["random"]
        battles = data["battles"]

        avg_damage = data["damage_dealt"] / battles if battles > 0 else 0
        avg_spot = data["spotted"] / battles if battles > 0 else 0
        avg_frag = data['frags'] / battles if battles > 0 else 0
        avg_def = data['dropped_capture_points'] / battles if battles > 0 else 0
        avg_winrate = data['wins'] / battles * 100 if battles > 0 else 0
        return {
            "avg_damage": avg_damage,
            "avg_spot": avg_spot,
            "avg_frag": avg_frag,
            "avg_def": avg_def,
            "avg_winrate": avg_winrate,
        }
    async def get_exp_values(self, wg_tank_id: int, db: AsyncSession) -> dict:
        """Get expected values from Database"""
        result = await db.execute(select(Tank).where(Tank.wg_tank_id == wg_tank_id))
        tank = result.scalars().first()
        if not tank:
            return
        return {
            "exp_damage": tank.exp_damage,
            "exp_spot": tank.exp_spot,
            "exp_frag": tank.exp_frag,
            "exp_def": tank.exp_def,
            "exp_winrate": tank.exp_winrate
        }
    
    async def calculate_wn8(self, avg_values: dict, exp_values: dict):
        """Calculate WN8 for a given vehicle"""
        r_damage = avg_values["avg_damage"] / exp_values["exp_damage"]
        r_spot = avg_values["avg_spot"] / exp_values["exp_spot"]
        r_frag = avg_values["avg_frag"] / exp_values["exp_frag"]
        r_def = avg_values["avg_def"] / exp_values["exp_def"]
        r_win = avg_values["avg_winrate"] / exp_values["exp_winrate"]

        r_win_c = max(0, (r_win - 0.71) / (1 - 0.71))
        r_damage_c = max(0, (r_damage - 0.22) / (1 - 0.22))
        r_frag_c = min(r_damage_c + 0.2, max(0, (r_frag - 0.12)) / (1 - 0.12))
        r_spot_c = min(r_damage_c + 0.1, max(0, (r_spot - 0.38) / (1 - 0.38)))
        r_def_c = min(r_damage_c + 0.1, max(0, (r_def - 0.10) / (1 - 0.10)))
        wn8 = 980 * r_damage_c + 210 * r_damage_c * r_frag_c + 155 * r_frag_c * r_spot_c + 75 * r_def_c * r_frag_c + 145 * min(1.8, r_win_c)
        return round(wn8, 2)
    
    async def save_vehicle_statistics(self, wg_player_id: int, stat_data: dict, db: AsyncSession):
        """Save vehicles statistics to DB"""
        query = select(VehiclesStats).where(VehiclesStats.wg_player_id == wg_player_id).where(VehiclesStats.wg_tank_id == stat_data["wg_tank_id"]).where(VehiclesStats.actual == True)
        result = await db.execute(query)
        latest_vehicle_statistics = result.scalars().first()
        if latest_vehicle_statistics:
            if latest_vehicle_statistics.tank_battles == stat_data["battles"]:
                return
            latest_vehicle_statistics.actual = False
            
        new_vehicle_statistics = VehiclesStats(
            wg_player_id=wg_player_id,
            wg_tank_id=stat_data["wg_tank_id"],
            tank_battles=stat_data["battles"],
            tank_wn8=stat_data["wn8"],
            avg_damage=stat_data["avg_damage"],
            avg_spot=stat_data["avg_spot"],
            avg_frag=stat_data["avg_frag"],
            avg_def=stat_data["avg_def"],
            avg_winrate=stat_data["avg_winrate"]
        )
        db.add(new_vehicle_statistics)
        await db.commit()
        await db.refresh(new_vehicle_statistics)
        return new_vehicle_statistics

    async def calculate_vehicle_stats(self, tank_item: dict, db: AsyncSession) -> dict:
        """Calculate vehicle statistics based on API data"""
        wg_tank_id = tank_item["tank_id"]
        battles = tank_item["random"]["battles"]
        if battles == 0:
            return
        exp_values = await self.get_exp_values(wg_tank_id, db)
        if not exp_values:
            return
        avg_values = await self.calculate_avg_values(tank_item)
        wn8 = await self.calculate_wn8(avg_values, exp_values)
        return {
            "wg_tank_id": wg_tank_id,
            "battles": battles,
            "wn8": wn8,
            "avg_damage": avg_values["avg_damage"],
            "avg_spot": avg_values["avg_spot"],
            "avg_frag": avg_values["avg_frag"],
            "avg_def": avg_values["avg_def"],
            "avg_winrate": avg_values["avg_winrate"],
        }

    async def update_vehicles_stats(self, wg_player_id: int, db: AsyncSession):
        """Method to get vehicle data from API, calculate statistics and save statistics"""
        player = await db.execute(select(Player).where(Player.wg_player_id == wg_player_id))
        if not player.scalars().first():
            raise HTTPException(status_code=404, detail="Player not found")
        vehicles_data = await self.collect_vehicles_data(wg_player_id)
        vehicles_stats = [await self.calculate_vehicle_stats(item, db) for item in vehicles_data]
        saved_vehicles = [await self.save_vehicle_statistics(wg_player_id, item, db) for item in vehicles_stats if item is not None]
        return len([item for item in saved_vehicles if item is not None])
    
    async def get_vehicles_stats(self, wg_player_id: int, db: AsyncSession):
        """Method to get all actual vehicle statistics from DB"""
        query = (
            select(VehiclesStats)
            .where(VehiclesStats.wg_player_id == wg_player_id)
            .where(VehiclesStats.actual == True)
            .order_by(VehiclesStats.tank_battles.desc())
        )
        result = await db.execute(query)
        return result.scalars().all()
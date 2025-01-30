import httpx
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from core.config import WARGAMING_API_KEY
from models.expected_values import Tank


class ExpectedValuesService:
    """Service class to fetch data from WG api and XVM api and update database with expected tank values"""
    xvm_expected_url = 'https://static.modxvm.com/wn8-data-exp/json/wn8exp.json'
    wg_vehicles_url = 'https://api.worldoftanks.eu/wot/encyclopedia/vehicles/'

    async def collect_xvm_values(self):
        """Fetch expected values from XVM API"""
        url = self.xvm_expected_url
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            if response.status_code == 200:
                return response.json()
            return None
        
    async def get_all_tanks(self) -> dict:
        """Fetch all existing tanks from WG API and save in database"""

        url = self.wg_vehicles_url
        application_id = WARGAMING_API_KEY
        params = {
            'application_id': application_id,
            'fields': 'name, nation, tier, type, images, tank_id'
        }

        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(url, params=params)
                response.raise_for_status()  # Raise error for bad responses (4xx, 5xx)


                response_data = response.json()
                if "data" in response_data:
                    return response_data["data"]
                else:
                    return {"error": "Missing 'data' field in response"}

        except httpx.HTTPStatusError as e:
            return {"error": f"HTTP error: {e.response.status_code}"}
        except httpx.RequestError as e:
            return {"error": f"Request error: {str(e)}"}
    
    @staticmethod
    async def update_tank(tank: Tank, tank_data:dict):
        """Update basic tank attributes in database"""
        tank.name = tank_data['name']
        tank.nation = tank_data['nation']
        tank.tier = tank_data['tier']
        tank.type = tank_data['type']
        tank.small_icon = tank_data['images']['small_icon']
        tank.contour_icon = tank_data['images']['contour_icon']
        tank.big_icon = tank_data['images']['big_icon']

        
    async def save_tanks_list(self, db: AsyncSession, tanks_list: dict):
        """Save all WG tanks in database"""
        counter = 0
        for item in tanks_list:
            tank_data = tanks_list.get(item)
            result = await db.execute(select(Tank).where(Tank.wg_tank_id == tank_data['tank_id']))
            tank = result.scalars().first()
            if tank:
                await self.update_tank(tank, tank_data)
            else:
                new_tank = Tank(
                    name=tank_data['name'],
                    nation=tank_data['nation'],
                    wg_tank_id=tank_data['tank_id'],
                    tier=tank_data['tier'],
                    type=tank_data['type'],
                    small_icon=tank_data['images']['small_icon'],
                    contour_icon=tank_data['images']['contour_icon'],
                    big_icon=tank_data['images']['big_icon'],
                )
                db.add(new_tank)
                counter += 1
        await db.commit()
        return counter


    async def update_tanks_xvm(self, db:AsyncSession, expected_values: dict):
        counter = 0
        data = expected_values.get('data')
        if not data:
            return {"error": "missing 'data' field"}
        for item in data:
            query = await db.execute(select(Tank).where(Tank.wg_tank_id == item['IDNum']))
            tank = query.scalars().first()
            if tank:
                tank.exp_def = item['expDef']
                tank.exp_damage = item['expDamage']
                tank.exp_frag = item['expFrag']
                tank.exp_spot = item['expSpot']
                tank.exp_winrate = item['expWinRate']
                counter += 1
        await db.commit()
        return counter
            

    async def update_expected_values(self, db: AsyncSession):
        """Update all tanks list in DB and their expected values"""
        tanks_list = await self.get_all_tanks()
        tanks_added = await self.save_tanks_list(db, tanks_list)
        expected_values = await self.collect_xvm_values()
        tanks_updated = await self.update_tanks_xvm(db, expected_values)
        return {"tanks_added": tanks_added, "tanks_updated": tanks_updated}
                
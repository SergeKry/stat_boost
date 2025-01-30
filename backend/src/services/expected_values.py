import httpx
from core.config import WARGAMING_API_KEY

class ExpectedValuesService:
    """Service class to fetch data from WG api and XVM api and update database with expected tank values"""

    async def collect_xvm_values():
        """Fetch expected values from XVM API"""
        url = 'https://static.modxvm.com/wn8-data-exp/json/wn8exp.json'
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            if response.status_code == 200:
                return response.json()
            return None
        
    async def get_all_tanks():
        """Fetch all existing tanks from WG API and save in database"""

        url = 'https://api.worldoftanks.eu/wot/encyclopedia/vehicles/'
        application_id = WARGAMING_API_KEY
        params = {
            'application_id': application_id,
            'fields': 'name, nation, tier, type, images'
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

                
import httpx

class ExpectedValuesService:
    """Service class to fetch data from WG api and XVM api and update database"""

    async def collect_values():
        """Fetch expected values from XVM API"""
        url = "https://static.modxvm.com/wn8-data-exp/json/wn8exp.json"
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            if response.status_code == 200:
                return response.json()
            return None
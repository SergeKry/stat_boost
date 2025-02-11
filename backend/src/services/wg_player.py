import httpx
from fastapi import HTTPException
from core.config import WARGAMING_API_KEY


class WgPlayerIdService:
    """Service that works with WG API to fetch players and their details"""
    wg_players_url = "https://api.worldoftanks.eu/wot/account/list/"
    wg_player_details = "https://api.worldoftanks.eu/wot/account/info/"
    params ={
        'application_id': WARGAMING_API_KEY,
    }
    
    async def get_players(self, nickname: str):
        url = self.wg_players_url
        params = self.params
        params.update({'search': nickname})

        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(url, params=params)
                response.raise_for_status()


                response_data = response.json()
                if "data" in response_data:
                    return response_data["data"]
                else:
                    return {"error": "Missing 'data' field in response"}

        except httpx.HTTPStatusError as e:
            return {"error": f"HTTP error: {e.response.status_code}"}
        except httpx.RequestError as e:
            return {"error": f"Request error: {str(e)}"}
        
    async def get_player_details(self, account_id: int):
        url = self.wg_player_details
        params = self.params
        params.update({
            "account_id": account_id,
            "extra": "statistics.random",
            "fields": "last_battle_time, created_at, statistics, nickname, logout_at",
        })

        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(url, params=params)
                response.raise_for_status()


                response_data = response.json()
                player_details = response_data["data"].get(str(account_id))
                return player_details

        except httpx.HTTPStatusError as e:
            return {"error": f"HTTP error: {e.response.status_code}"}
        except httpx.RequestError as e:
            return {"error": f"Request error: {str(e)}"}
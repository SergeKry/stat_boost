from fastapi import APIRouter, Depends, Query, HTTPException
from services.wg_player import WgPlayerIdService as Service
from schemas.wg_player import WgPlayerDetailsResponse

router = APIRouter()


@router.get("/")
async def get_wg_players(search: str = Query(None)):
    """Fetch all WG players of a given nickname from WG API and return their IDs"""
    if not search:
        raise HTTPException(status_code=400, detail="Search query for nickname is empty")
    wg_players = await Service().get_players(search)
    return wg_players

@router.get("/{wg_player_id}")
async def get_wg_player(wg_player_id: int) -> WgPlayerDetailsResponse:
    """Get WG Player details from WG API"""
    player_details = await Service().get_player_details(wg_player_id)
    response = WgPlayerDetailsResponse(
        nickname=player_details["nickname"],
        created_at=player_details["created_at"],
        logout_at=player_details["logout_at"],
        last_battle_time=player_details["last_battle_time"],
        statistics=player_details["statistics"]["random"]
    )
    return response
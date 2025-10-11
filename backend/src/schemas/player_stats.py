from pydantic import BaseModel
from datetime import datetime

class PlayerStatsSchema(BaseModel):
    wg_player_id: int
    battles: int
    wn8: float
    is_actual: bool
    created_at: datetime
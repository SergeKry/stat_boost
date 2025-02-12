from pydantic import BaseModel, Field
from datetime import datetime

class Player(BaseModel):
    nickname: str = Field(..., min_length=3, max_length=24)
    wg_player_id: int

class PlayerCreate(Player):
    pass

class PlayerResponse(Player):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True 
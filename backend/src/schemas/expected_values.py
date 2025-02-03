from pydantic import BaseModel, HttpUrl
from typing import Optional

class TankBase(BaseModel):
    name: str
    nation: str
    wg_tank_id: int
    tier: int
    type: str
    exp_def: Optional[float] = None
    exp_spot: Optional[float] = None
    exp_damage: Optional[float] = None
    exp_winrate: Optional[float] = None
    exp_frag: Optional[float] = None
    small_icon: Optional[HttpUrl] = None
    contour_icon: Optional[HttpUrl] = None
    big_icon: Optional[HttpUrl] = None

class TankResponse(TankBase):
    id: int
    
    class Config:
        orm_mode = True 
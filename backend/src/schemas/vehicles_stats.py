from pydantic import BaseModel

class VehicleStatsSchema(BaseModel):
    wg_tank_id: int
    avg_damage: float
    avg_spot: float
    avg_def: float
    tank_battles: int
    tank_wn8: float
    avg_frag: float
    avg_winrate: float
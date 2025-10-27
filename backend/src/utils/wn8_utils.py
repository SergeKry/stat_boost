from typing import Sequence
from models.vehicles_stats import VehiclesStats

async def calculate_players_wn8(vehicles_stats: Sequence[VehiclesStats]) -> tuple[float, int]:
    """Calculate Player's WN8. Return (wn8, total_battles)."""
    total_battles = 0
    weighted_sum = 0.0

    for s in vehicles_stats:
        battles = int(s.tank_battles or 0)
        wn8 = float(s.tank_wn8 or 0.0)

        total_battles += battles
        weighted_sum += wn8 * battles

    avg = weighted_sum / total_battles if total_battles else 0.0
    return round(avg, 2), total_battles
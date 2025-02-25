import pytest
from sqlalchemy.ext.asyncio import AsyncSession
from main import app
from models.players import Player
from models.vehicles_stats import VehiclesStats
from fastapi.testclient import TestClient
from sqlalchemy import delete, select

@pytest.mark.asyncio
class TestPlayers:
    """Class to test set of endpoints for Players"""

    endpoint_url = "/vehicles-stats/"

    @pytest.fixture(autouse=True)
    async def setup_class(self, test_db_session: AsyncSession):
        """Setup test data once for all test methods"""
        self.client = TestClient(app)
        self.db = test_db_session

        self.wargaming_existing_player_id = 595861151
        self.existing_player = Player(
                nickname="Test_player",
                wg_player_id=self.wargaming_existing_player_id
            )
        
        self.db.add(self.existing_player)

        self.vehicle_statistics_data = {
            "wg_player_id": self.wargaming_existing_player_id,
            "wg_tank_id": 18497,
            "avg_damage": 639.4326923076923,
            "avg_spot": 2.3653846153846154,
            "avg_def": 0,
            "tank_battles": 104,
            "tank_wn8": 989.85,
            "avg_frag": 0.4326923076923077,
            "avg_winrate": 44.230769230769226
            }
        self.existing_vehicle_statistics = VehiclesStats(**self.vehicle_statistics_data)

        self.db.add(self.existing_vehicle_statistics)

        await self.db.commit()

        yield  # Run the tests

        # Cleanup after all tests in this class
        await self.db.execute(delete(Player))
        await self.db.execute(delete(VehiclesStats))
        await self.db.commit()

    async def test_get_all_vehicles_stats(self):
        """Positive test to get the list of all vehicle statistics"""
        vehicles_stats_endpoint_url = f"{self.endpoint_url}{self.wargaming_existing_player_id}"
        response = self.client.get(vehicles_stats_endpoint_url)

        assert response.status_code == 200
        response_data = response.json()
        assert type(response_data) == dict

        assert str(self.wargaming_existing_player_id) in response_data
        assert isinstance(response_data[str(self.wargaming_existing_player_id)], list)



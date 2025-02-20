import pytest
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from services.vehicles_stats import VehiclesStatsService
from models.expected_values import Tank
from sqlalchemy import delete, select


@pytest.mark.asyncio
class TestVehiclesStats:
    """Testing service that works with vehicles statistics, calculates wn8 and saves statistics data in DB"""

    @pytest.fixture(autouse=True)
    async def setup_and_teardown(self, test_db_session: AsyncSession):
        """Set up reusable db session for the test class."""

        self.db = test_db_session
        self.service = VehiclesStatsService()

        self.wg_player_id = 595861151
        self.wg_tank_id = 18497

        self.tank_item_from_api = {
                "random": {
                    "spotted": 246,
                    "battles_on_stunning_vehicles": 0,
                    "track_assisted_damage": 4113,
                    "max_xp": 0,
                    "xp": 61423,
                    "survived_battles": 13,
                    "dropped_capture_points": 0,
                    "hits_percents": 70,
                    "draws": 1,
                    "battles": 104,
                    "damage_received": 91167,
                    "frags": 45,
                    "stun_number": 0,
                    "capture_points": 0,
                    "stun_assisted_damage": 0,
                    "max_damage": 0,
                    "hits": 419,
                    "battle_avg_xp": 591,
                    "wins": 46,
                    "losses": 57,
                    "damage_dealt": 66501,
                    "max_frags": 0,
                    "shots": 600,
                    "radio_assisted_damage": 55620
                },
                "tank_id": self.wg_tank_id
            }
        
        self.exp_def = 0.778
        self.exp_spot = 2.707
        self.exp_damage = 788.562
        self.exp_winrate = 51.483
        self.exp_frag = 0.652

        self.exp_values = Tank(
            name="TestTank",
            nation="testnation",
            wg_tank_id=18497,
            tier=5,
            type="heavy",
            exp_def=self.exp_def,
            exp_spot=self.exp_spot,
            exp_damage=self.exp_damage,
            exp_winrate=self.exp_winrate,
            exp_frag=self.exp_frag,
        )
        
        yield  # Run the tests

        # Cleanup after all tests in this class
        await self.db.execute(delete(Tank))
        await self.db.commit()

    async def test_update_vehicles_stats_wrong_user(self):
        """Negative test to check that we cannot create statistics for the user that does not exist."""
        with pytest.raises(HTTPException) as exc_info:
            result = await self.service.update_vehicles_stats(self.wg_player_id, self.db)
        assert exc_info.value.status_code == 404
        assert exc_info.value.detail == "Player not found"

    async def test_collect_vehicles_data(self):
        """Test fetching player's data from WG API."""
        result = await self.service.collect_vehicles_data(self.wg_player_id)

        assert isinstance(result, list)
        assert len(result) > 0
        assert "random" in result[0]
        assert "tank_id" in result[0]

    async def test_calculate_vehicles_stats_no_battles(self):
        """Test to caclculate vehicles statistics with 0 battles"""
        mocked_data = self.tank_item_from_api
        mocked_data["random"]["battles"] = 0

        result = await self.service.calculate_vehicle_stats(mocked_data, self.db)
        assert result is None

    async def test_calculate_vehicles_stats_no_exp_values(self):
        """Test to calculate vehicles statistics without expected values"""
        result = await self.service.calculate_vehicle_stats(self.tank_item_from_api, self.db)
        assert result is None

    async def test_calculate_vehicles_stats(self):
        """Positive test to calculate vehicles statistics"""
        self.db.add(self.exp_values)
        await self.db.commit()

        result = await self.service.calculate_vehicle_stats(self.tank_item_from_api, self.db)
        assert isinstance(result, dict)
        assert "wg_tank_id" in result
        assert "battles" in result
        assert "wn8" in result
        assert "avg_damage" in result
        assert "avg_spot" in result
        assert "avg_frag" in result
        assert "avg_def" in result
        assert "avg_winrate" in result


    async def test_get_exp_values_positive(self):
        """Test to get exp values from database whern they exist"""
        self.db.add(self.exp_values)
        await self.db.commit()
        result = await self.service.get_exp_values(self.wg_tank_id, self.db)

        assert result is not None
        assert isinstance(result, dict)
        assert "exp_damage" in result
        assert "exp_spot" in result
        assert "exp_frag" in result
        assert "exp_def" in result
        assert "exp_winrate" in result


    async def test_get_exp_values_negative(self):
        """Test to get exp values from database if they do not exist"""
        result = await self.service.get_exp_values(self.wg_tank_id, self.db)
        assert result is None

    async def test_calculate_avg_values(self):
        """Test to calculate avg values"""
        result = await self.service.calculate_avg_values(self.tank_item_from_api)

        assert isinstance(result, dict)
        assert "avg_damage" in result
        assert "avg_spot" in result
        assert "avg_frag" in result
        assert "avg_def" in result
        assert "avg_winrate" in result


    async def test_calculate_avg_values_no_battles(self):
        """Test to calculate exp values if battles = 0"""
        mocked_data = self.tank_item_from_api
        mocked_data["random"]["battles"] = 0
        result = await self.service.calculate_avg_values(mocked_data)

        assert result["avg_damage"] == 0
        assert result["avg_spot"] == 0
        assert result["avg_frag"] == 0
        assert result["avg_def"] == 0
        assert result["avg_winrate"] == 0

    async def test_calculate_wn8(self):
        """Test to calculate wn8"""
        avg_values = {
            "avg_damage": 800,
            "avg_spot": 2.8,
            "avg_frag": 0.700,
            "avg_def": 0.8,
            "avg_winrate": 52
        }
        exp_values = {
            "exp_damage": self.exp_damage,
            "exp_spot": self.exp_spot,
            "exp_frag": self.exp_frag,
            "exp_def": self.exp_def,
            "exp_winrate": self.exp_winrate
        }
        result = await self.service.calculate_wn8(avg_values, exp_values)
        assert isinstance(result, float)
        assert result == 1641.15
    
    async def test_statistics_creation(self):
        """Test that vehicle statistics is properly saved"""

import pytest
from sqlalchemy.ext.asyncio import AsyncSession
from main import app
from models.expected_values import Tank
from fastapi.testclient import TestClient
from sqlalchemy import delete


@pytest.mark.asyncio
class TestGetTanks:
    """Class to test GET endpoint for retrieving tanks"""

    @pytest.fixture(autouse=True)
    async def setup_class(self, test_db_session: AsyncSession):
        """Setup test data once for all test methods"""
        self.client = TestClient(app)
        self.db = test_db_session

        # Insert test data
        self.test_tanks = [
            Tank(name="T-34", nation="ussr", wg_tank_id=1, tier=5, type="mediumTank",
                 small_icon="http://api.worldoftanks.eu/static/2.76.0/wot/encyclopedia/vehicle/small/ussr-R04_T-34.png",
                 contour_icon="http://api.worldoftanks.eu/static/2.76.0/wot/encyclopedia/vehicle/contour/ussr-R04_T-34.png",
                 big_icon="http://api.worldoftanks.eu/static/2.76.0/wot/encyclopedia/vehicle/ussr-R04_T-34.png"),

            Tank(name="T14", nation="usa", wg_tank_id=33, tier=5, type="heavyTank",
                 small_icon="http://api.worldoftanks.eu/static/2.76.0/wot/encyclopedia/vehicle/small/usa-A21_T14.png",
                 contour_icon="http://api.worldoftanks.eu/static/2.76.0/wot/encyclopedia/vehicle/contour/usa-A21_T14.png",
                 big_icon="http://api.worldoftanks.eu/static/2.76.0/wot/encyclopedia/vehicle/usa-A21_T14.png"),
        ]

        self.db.add_all(self.test_tanks)
        await self.db.commit()

        yield  # Run the tests

        # Cleanup after all tests in this class
        await self.db.execute(delete(Tank))
        await self.db.commit()

    async def test_get_tanks_list(self):
        """Test fetching all tanks via GET request"""
        response = self.client.get("/expected-values/")

        assert response.status_code == 200
        response_data = response.json()

        assert len(response_data) == 2  

        response_dict = {tank["wg_tank_id"]: tank for tank in response_data}

        assert response_dict[1]["name"] == "T-34"
        assert response_dict[1]["nation"] == "ussr"
        assert response_dict[1]["tier"] == 5

        assert response_dict[33]["name"] == "T14"
        assert response_dict[33]["nation"] == "usa"
        assert response_dict[33]["tier"] == 5
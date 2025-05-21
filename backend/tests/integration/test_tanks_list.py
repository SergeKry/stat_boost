import pytest
from sqlalchemy.ext.asyncio import AsyncSession
from main import app
from models.expected_values import Tank
from fastapi.testclient import TestClient
from sqlalchemy import delete


@pytest.mark.asyncio
class TestGetTanks:
    """Class to test GET endpoint for retrieving tanks"""

    endpoint_url = "/expected-values/"
    wg_tank_id = 1

    @pytest.fixture(autouse=True)
    async def setup_class(self, test_db_session: AsyncSession):
        """Setup test data once for all test methods"""
        self.client = TestClient(app)
        self.db = test_db_session

        # Insert test data
        self.test_tanks = [
            Tank(name="T-34", nation="ussr", wg_tank_id=self.wg_tank_id, tier=5, type="mediumTank",
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
        response = self.client.get(self.endpoint_url)

        assert response.status_code == 200
        response_data = response.json()["data"]

        assert len(response_data) == 2  

        response_dict = {tank["wg_tank_id"]: tank for tank in response_data}

        assert response_dict[1]["name"] == "T-34"
        assert response_dict[1]["nation"] == "ussr"
        assert response_dict[1]["tier"] == 5

        assert response_dict[33]["name"] == "T14"
        assert response_dict[33]["nation"] == "usa"
        assert response_dict[33]["tier"] == 5

    async def test_get_tanks_list_pagination(self):
        """Test pagination of get all tanks endpoint"""
        response = self.client.get(self.endpoint_url)

        assert response.status_code == 200
        response_data = response.json()

        assert response_data["page"] == 1
        assert response_data["total_tanks"] == 2
        assert response_data["total_pages"] == 1
        assert "limit" in response_data
        assert "data" in response_data

    async def test_get_tanks_list_sorting(self):
        response = self.client.get(f"{self.endpoint_url}?sort_by=name")

        assert response.status_code == 200
        response_data = response.json()["data"]

        assert response_data[0]["name"] == "T-34"

    async def test_get_tanks_list_search(self):
        response = self.client.get(f"{self.endpoint_url}?search=T-34")
        
        assert response.status_code == 200
        response_data = response.json()["data"]

        assert len(response_data) == 1
        assert response_data[0]["name"] == "T-34"

    async def test_get_one_tank(self):
        response = self.client.get(f"{self.endpoint_url}{self.wg_tank_id}")
        assert response.status_code == 200

        response_data = response.json()
        assert "wg_tank_id" in response_data
        assert response_data["wg_tank_id"] == self.wg_tank_id
        assert "nation" in response_data
        assert "type" in response_data
        assert "exp_spot" in response_data
        assert "exp_winrate" in response_data
        assert "small_icon" in response_data
        assert "big_icon" in response_data
        assert "updated_at" in response_data
        assert "id" in response_data
        assert "name" in response_data
        assert "tier" in response_data
        assert "exp_def" in response_data
        assert "exp_damage" in response_data
        assert "exp_frag" in response_data
        assert "contour_icon" in response_data
        assert "created_at" in response_data
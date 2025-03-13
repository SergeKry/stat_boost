import pytest
from main import app
from fastapi.testclient import TestClient


@pytest.mark.asyncio
class TestWGPlayers:
    """Class for testing endpoints to fetch WG player data"""

    edpoint_url = "/wg_player/"
    wg_player_id = 595861151

    @pytest.fixture(autouse=True)
    async def setup_class(self):
        """Setup test data once for all test methods"""
        self.client = TestClient(app)

    async def test_get_wg_player_id(self):
        response = self.client.get(f"{self.edpoint_url}?search=pla")
        assert response.status_code == 200

        response_data = response.json()
        assert len(response_data) > 0

        response_item = response_data[0]
        assert "nickname" in response_item
        assert "account_id" in response_item

    async def test_get_wg_player_details(self):
        response = self.client.get(f"{self.edpoint_url}{self.wg_player_id}")
        assert response.status_code == 200

        response_data = response.json()
        assert "nickname" in response_data
        assert "created_at" in response_data
        assert "logout_at" in response_data
        assert "last_battle_time" in response_data
        assert "statistics" in response_data

    async def test_params(self):
        """This is to test that we use a copy of params for every request and we do not modify it"""
        response1 = self.client.get(f"{self.edpoint_url}?search=pla")
        assert response1.status_code == 200

        response2 = self.client.get(f"{self.edpoint_url}{self.wg_player_id}")
        assert response2.status_code == 200

        response3 = self.client.get(f"{self.edpoint_url}?search=pla")
        assert response3.status_code == 200
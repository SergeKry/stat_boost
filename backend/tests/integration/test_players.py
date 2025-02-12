import pytest
from sqlalchemy.ext.asyncio import AsyncSession
from main import app
from models.players import Player
from fastapi.testclient import TestClient
from sqlalchemy import delete, select

@pytest.mark.asyncio
class TestPlayers:
    """Class to test set of endpoints for Players"""

    endpoint_url = "/players/"

    @pytest.fixture(autouse=True)
    async def setup_class(self, test_db_session: AsyncSession):
        """Setup test data once for all test methods"""
        self.client = TestClient(app)
        self.db = test_db_session

        # Insert test data
        self.username_short = "ab"
        self.username_long = "aldrofijdmacdrigh5ldnacdh"
        self.username_normal = "username"
        self.wargaming_player_id = 313123
        self.wargaming_existing_player_id = 123456
        self.wargaming_existing_nickname = "Nickname"

        self.existing_player = Player(
            nickname=self.wargaming_existing_nickname,
            wg_player_id=self.wargaming_existing_player_id
        )

        self.db.add(self.existing_player)
        await self.db.commit()

        yield  # Run the tests

        # Cleanup after all tests in this class
        await self.db.execute(delete(Player))
        await self.db.commit()

    async def test_create_user(self):
        """Positive test for user creation"""

        new_user = {
            "nickname": self.username_normal,
            "wg_player_id": self.wargaming_player_id
        }
        
        response = self.client.post(self.endpoint_url, json=new_user)
        assert response.status_code == 200

        response_data = response.json()
        assert "nickname" in response_data
        assert "wg_player_id" in response_data
        assert "id" in response_data
        assert "created_at" in response_data
        assert "updated_at" in response_data

        assert response_data["nickname"] == self.username_normal
        assert response_data["wg_player_id"] == self.wargaming_player_id

        player = await self.db.get(Player, response_data["id"])
        assert player is not None, "Player was not found in the database!"
        assert player.nickname == self.username_normal
        assert player.wg_player_id == self.wargaming_player_id

    async def test_create_user_short_nickname(self):
        """Negative test for user creation. Wrong value = short nickname"""
        new_user = {
            "nickname": self.username_short,
            "wg_player_id": self.wargaming_player_id
        }

        response = self.client.post(self.endpoint_url, json=new_user)
        assert response.status_code == 422

    async def test_create_user_long_nickname(self):
        """Negative test for user creation. Wrong value = long nickname"""
        new_user = {
            "nickname": self.username_long,
            "wg_player_id": self.wargaming_player_id
        }

        response = self.client.post(self.endpoint_url, json=new_user)
        assert response.status_code == 422

    async def test_create_user_existing_wg_id(self):
        """Negative test for user creation. Wrong value = existing wg_player_id"""
        new_user = {
            "nickname": self.username_normal,
            "wg_player_id": self.wargaming_existing_player_id
        }

        response = self.client.post(self.endpoint_url, json=new_user)
        assert response.status_code == 400

    async def test_get_all_players(self):
        """Positive test to get the list of all players"""
        response = self.client.get(self.endpoint_url)

        assert response.status_code == 200
        response_data = response.json()
        assert len(response_data) > 0
        assert type(response_data) == list

    async def test_get_one_player(self):
        """Positive test to get one player"""
        result = await self.db.execute(select(Player).where(Player.wg_player_id == self.wargaming_existing_player_id))
        player = result.scalars().first()

        player_endpoint_url = f"{self.endpoint_url}{player.id}"
        response = self.client.get(player_endpoint_url)
        assert response.status_code == 200
        response_data = response.json()
        assert response_data["nickname"] == self.wargaming_existing_nickname
        assert response_data["wg_player_id"] == self.wargaming_existing_player_id

    async def test_delete_one_player(self):
        """Positive test to delete a player"""
        result = await self.db.execute(select(Player).where(Player.wg_player_id == self.wargaming_existing_player_id))
        player = result.scalars().first()

        player_endpoint_url = f"{self.endpoint_url}{player.id}"
        response = self.client.delete(player_endpoint_url)
        assert response.status_code == 200

        deleted_player = await self.db.execute(select(Player).where(Player.wg_player_id == self.wargaming_existing_player_id))
        assert not deleted_player.scalars().first()
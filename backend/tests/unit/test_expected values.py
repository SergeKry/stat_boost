import pytest
from sqlalchemy.ext.asyncio import AsyncSession
from models.expected_values import Tank
from services.expected_values import ExpectedValuesService
from sqlalchemy.future import select


@pytest.mark.asyncio
class TestTankExpectedValues:
    """Testing saving tanks list and updating their xvm values"""
    @pytest.fixture(autouse=True)
    async def setup_class(self, db_session: AsyncSession):
        """Set up reusable db session for the test class."""
        self.db = db_session
        self.service = ExpectedValuesService()

        # Mock tanks_list
        self.tanks_list = {
            "1": {
                "name": "T-34",
                "nation": "ussr",
                "tier": 5,
                "images": {
                    "small_icon": "http://api.worldoftanks.eu/static/2.76.0/wot/encyclopedia/vehicle/small/ussr-R04_T-34.png",
                    "contour_icon": "http://api.worldoftanks.eu/static/2.76.0/wot/encyclopedia/vehicle/contour/ussr-R04_T-34.png",
                    "big_icon": "http://api.worldoftanks.eu/static/2.76.0/wot/encyclopedia/vehicle/ussr-R04_T-34.png"
                },
                "type": "mediumTank",
                "tank_id": 1
            },
            "33": {
                "name": "T14",
                "nation": "usa",
                "tier": 5,
                "images": {
                    "small_icon": "http://api.worldoftanks.eu/static/2.76.0/wot/encyclopedia/vehicle/small/usa-A21_T14.png",
                    "contour_icon": "http://api.worldoftanks.eu/static/2.76.0/wot/encyclopedia/vehicle/contour/usa-A21_T14.png",
                    "big_icon": "http://api.worldoftanks.eu/static/2.76.0/wot/encyclopedia/vehicle/usa-A21_T14.png"
                },
                "type": "heavyTank",
                "tank_id": 33
            },
        }

        # Mock xvm values
        self.xvm_values = {
            "data": [
                {
                "IDNum": 1,
                "expDef": 1.146,
                "expFrag": 0.982,
                "expSpot": 1.379,
                "expDamage": 486.992,
                "expWinRate": 54.854
                },
                {
                "IDNum": 33,
                "expDef": 1.181,
                "expFrag": 1.239,
                "expSpot": 1.567,
                "expDamage": 625.842,
                "expWinRate": 55.866
                },
        ]
        }

            
    async def test_save_tanks_list(self):
        """Test saving a list of tanks to the database."""

        added_count = await self.service.save_tanks_list(self.db, self.tanks_list)

        assert added_count == 2  # Expect 2 tanks to be added

        result = await self.db.execute(select(Tank))
        all_tanks = result.scalars().all()
        assert len(all_tanks) == 2  # Ensure the correct number of tanks is saved

        t34 = next(t for t in all_tanks if t.wg_tank_id == 1)
        assert t34.name == "T-34"
        assert t34.nation == "ussr"
        assert t34.tier == 5

        t14 = next(t for t in all_tanks if t.wg_tank_id == 33)
        assert t14.name == "T14"
        assert t14.nation == "usa"
        assert t14.tier == 5

    async def test_update_tanks_xvm_values(self):
        added_count = await self.service.update_tanks_xvm(self.db, self.xvm_values)
        assert added_count == 2

        result = await self.db.execute(select(Tank))
        all_tanks = result.scalars().all()

        t34 = next(t for t in all_tanks if t.wg_tank_id == 1)
        assert t34.exp_def == 1.146
        assert t34.exp_damage == 486.992
        assert t34.exp_frag == 0.982
        assert t34.exp_spot == 1.379
        assert t34.exp_winrate == 54.854

        t14 = next(t for t in all_tanks if t.wg_tank_id == 33)
        assert t14.exp_def == 1.181
        assert t14.exp_damage == 625.842
        assert t14.exp_frag == 1.239
        assert t14.exp_spot == 1.567
        assert t14.exp_winrate == 55.866
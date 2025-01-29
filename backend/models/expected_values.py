from sqlalchemy import Column, Integer, String, Float
from backend.core.database import Base

class Tank(Base):
    __tablename__ = "tanks"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    nation = Column(String(100), nullable=False)
    wg_tank_id = Column(Integer, unique=True, nullable=False)
    tier = Column(Integer, nullable=False)
    type = Column(String(100), nullable=False)
    exp_def = Column(Float, nullable=True)
    exp_spot = Column(Float, nullable=True)
    exp_damage = Column(Float, nullable=True)
    exp_winrate = Column(Float, nullable=True)
    exp_frag = Column(Float, nullable=True)
    small_icon = Column(String, nullable=True)  # URLField equivalent
    contour_icon = Column(String, nullable=True)  # URLField equivalent
    big_icon = Column(String, nullable=True)  # URLField equivalent
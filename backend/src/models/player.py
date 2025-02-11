from sqlalchemy import Column, Integer, String, Float
from core.database import Base

class Player(Base):
    __tablename__ = "players"

    id = Column(Integer, primary_key=True, autoincrement=True)
    nickname = Column(String(100), nullable=False)
    wg_player_id = Column(Integer, unique=True, nullable=False)
from core.database import Base
from sqlalchemy import Column, Integer, Float, Boolean, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship

class PlayerStats(Base):
    __tablename__ = "player_stats"

    id = Column(Integer, primary_key=True, autoincrement=True)
    wg_player_id = Column(Integer, ForeignKey("players.wg_player_id"), nullable=False)
    computed_battles = Column(Integer, nullable=False)
    player_battles = Column(Integer, nullable=False)
    wn8 = Column(Float, nullable=False)
    is_actual = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    player = relationship("Player", foreign_keys=[wg_player_id])
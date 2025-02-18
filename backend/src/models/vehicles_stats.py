from sqlalchemy import Column, Integer, Boolean, ForeignKey, Float, DateTime, func
from sqlalchemy.orm import relationship
from core.database import Base

class VehiclesStats(Base):
    __tablename__ = "vehicles_stats"

    id = Column(Integer, primary_key=True, autoincrement=True)
    wg_player_id = Column(Integer, ForeignKey("players.wg_player_id", ondelete="NO ACTION"), nullable=False)
    wg_tank_id = Column(Integer, ForeignKey("tanks.wg_tank_id", ondelete="NO ACTION"), nullable=False)
    
    tank_battles = Column(Integer, default=0, nullable=False)
    tank_wn8 = Column(Float, default=0, nullable=False)
    
    created_at = Column(DateTime, default=func.now())
    actual = Column(Boolean, default=True, nullable=False)
    
    avg_damage = Column(Float, default=0, nullable=True)
    avg_spot = Column(Float, default=0, nullable=True)
    avg_frag = Column(Float, default=0, nullable=True)
    avg_def = Column(Float, default=0, nullable=True)
    avg_winrate = Column(Float, default=0, nullable=True)

    player = relationship("Player", back_populates="vehicles_stats")
    tank = relationship("Tank", back_populates="vehicles_stats")

    def __repr__(self):
        return f"<VehiclesStats(player_id={self.player_id}, tank_id={self.tank_id}, tank_battles={self.tank_battles})>"
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, asc
from models.players import Player
from schemas.players import PlayerCreate

class PlayerService():
    """Class to handle Player CRUD operations"""

    async def create_player(self, db: AsyncSession, player: PlayerCreate):
        """Create Player"""
        existing_player = await db.execute(select(Player).where(Player.wg_player_id == player.wg_player_id))
        if existing_player.scalars().first():
            raise HTTPException(status_code=400, detail="wg_player_id already exists")

        new_player = Player(**player.dict())
        db.add(new_player)
        await db.commit()
        await db.refresh(new_player)
        return new_player

    async def get_players(self, db: AsyncSession):
        """Get all Players"""
        query = select(Player).order_by(Player.created_at.asc())
        result = await db.execute(query)
        return result.scalars().all()
    
    async def get_player(self, db: AsyncSession, player_id: int):
        """Get one player"""
        player = await db.get(Player, player_id)
        if not player:
            raise HTTPException(status_code=404, detail="Player not found")
        return player
    
    async def delete_player(self, db: AsyncSession, player_id:int):
        """Delete player"""
        player = await db.get(Player, player_id)
        if not player:
            raise HTTPException(status_code=404, detail="Player not found")
        await db.delete(player)
        await db.commit()
        return {"message": "Player deleted successfully"}
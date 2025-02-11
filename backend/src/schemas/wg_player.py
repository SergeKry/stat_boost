from pydantic import BaseModel
from datetime import datetime

class WgPlayerDetailsResponse(BaseModel):
    nickname: str
    created_at: datetime
    logout_at: datetime
    last_battle_time: datetime
    statistics : dict
    

    @classmethod
    def validate_created_at(cls, value):
        return datetime.fromtimestamp(value)
    
    @classmethod
    def validate_logout_at(cls, value):
        return datetime.fromtimestamp(value)
    
    @classmethod
    def validate_last_battle_time(cls, value):
        return datetime.fromtimestamp(value)
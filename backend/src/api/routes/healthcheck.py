from fastapi import APIRouter, Depends

router = APIRouter()

@router.get("/")
def healthcheck():
    return {"message": "Healthckech OK"}
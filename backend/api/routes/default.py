from fastapi import APIRouter, Depends

router = APIRouter()

@router.get("/")
def read_root():
    return {"message": "Hello, World!"}
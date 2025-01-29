from fastapi import FastAPI
from api.routes import default

app = FastAPI()

app.include_router(default.router, prefix="/default", tags=["Default"])
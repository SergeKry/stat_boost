from fastapi import FastAPI
from api.routes import (default,
                        expected_values,)

app = FastAPI()

app.include_router(default.router, prefix="/default", tags=["Default"])
app.include_router(expected_values.router, prefix="/expected-values", tags=["Expected Values"])
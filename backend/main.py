from fastapi import FastAPI, Depends
from fastapi.security import HTTPBearer
from routers import roles
from core.auth import get_current_user

app = FastAPI()
security = HTTPBearer()

app.include_router(roles.router)
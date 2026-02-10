from fastapi import FastAPI
from fastapi.security import HTTPBearer
from routers import roles, users, identification_types
from fastapi.middleware.cors import CORSMiddleware
from core.middleware import LoggingMiddleware

app = FastAPI()
security = HTTPBearer()
app.add_middleware(LoggingMiddleware)

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(roles.router)
app.include_router(users.router) 
app.include_router(identification_types.router)
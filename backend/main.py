from fastapi import FastAPI
from fastapi.security import HTTPBearer
from routers import roles, users
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
security = HTTPBearer()

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
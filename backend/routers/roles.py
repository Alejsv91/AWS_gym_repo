from fastapi import APIRouter, Depends, HTTPException
from core.db import get_connection
from fastapi.security import HTTPBearer
from core.auth import get_current_user
from services.roles_service import fetch_roles


security = HTTPBearer()

router = APIRouter(prefix="/roles", tags=["roles"])

@router.get("/")
def get_roles(user=Depends(get_current_user)):
    try: 
        return fetch_roles()
    except Exception as e:
        return {"error": str(e)}
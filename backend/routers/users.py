from fastapi.security import HTTPBearer
from fastapi import APIRouter, Depends
from core.auth import get_current_user
from services.users_service import fetch_users, fetch_user_by_id
security = HTTPBearer()

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/")
def get_users(user=Depends(get_current_user)):
    try: 
        return fetch_users()
    except Exception as e:
        return {"error": str(e)}
    
@router.get("/{user_id}")
def get_user_by_id(user_id: int, user=Depends(get_current_user)):
    try:
        return fetch_user_by_id(user_id)
    except Exception as e:
        return {"error": str(e)}
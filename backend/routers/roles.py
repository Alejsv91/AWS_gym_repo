from fastapi import APIRouter, Depends
from fastapi.security import HTTPBearer
from core.auth import get_current_user
from services.roles_service import *
from models.role import RoleCreate

security = HTTPBearer()

router = APIRouter(prefix="/roles", tags=["roles"])

@router.get("/")
def get_roles(user=Depends(get_current_user)):
    try: 
        roles = fetch_roles()
        print(roles)
        return roles
    except Exception as e:
        return {"error": str(e)}
    
@router.post("/")
def create_role(role_data: RoleCreate, user=Depends(get_current_user)):
    try: 
        return create_role(role_data)
    except Exception as e:
        return {"error": str(e)}
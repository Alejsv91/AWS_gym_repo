from fastapi import APIRouter, Depends
from fastapi.security import HTTPBearer
from core.auth import get_current_user
from services.roles_service import *
from models.role import RoleCreate
from core.logger import logger

security = HTTPBearer()

router = APIRouter(prefix="/roles", tags=["roles"])

@router.get("/")
def get_roles(user=Depends(get_current_user)):
    try: 
        logger.info(f"User {user['username']} is fetching roles")
        roles = fetch_roles()
        logger.info(f"Roles fetched successfully: {roles}")
        return roles
    except Exception as e:
        logger.error(f"Error fetching roles for user {user['username']}: {str(e)}")
        return {"error": str(e)}
    
@router.post("/")
def create_role(role_data: RoleCreate, user=Depends(get_current_user)):
    try: 
        logger.info(f"User {user['username']} is creating a new role with data: {role_data}")
        id = create_role(role_data)
        logger.info(f"Role created successfully with ID: {id}")
        return f"role created with id: {id}"
    except Exception as e:
        logger.error(f"Error creating role for user {user['username']}: {str(e)}")
        return {"error": str(e)}
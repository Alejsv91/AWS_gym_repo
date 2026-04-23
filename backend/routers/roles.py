from fastapi import APIRouter, Depends
from fastapi.security import HTTPBearer
from core.auth import get_current_user
from services.roles_service import *
from models.role import RoleCreate
from core.logger import logger
import traceback

security = HTTPBearer()

router = APIRouter(prefix="/roles", tags=["roles"])

@router.get("/{role_id}", response_model=RoleGet, status_code=200)
def get_role_by_id(role_id:str, user=Depends(get_current_user)):
    try: 
        logger.info(f"User {user['username']} is fetching role with ID: {role_id}")
        role = fetch_role_by_id(role_id)
        if role:
            logger.info(f"Role fetched successfully: {role}")
            return role
        else:
            logger.warning(f"Role with ID {role_id} not found")
            return {"error": "Role not found"}
    except Exception as e:
        logger.error(logger.error(f"Error fetching role:\n{traceback.format_exc()}"))
        raise HTTPException(status_code=500, detail="Error fetching role")

@router.get("/")
def get_roles(user=Depends(get_current_user)):
    try: 
        logger.info(f"User {user['username']} is fetching roles")
        roles = fetch_roles()
        logger.info(f"Roles fetched successfully: {roles}")
        return roles
    except Exception as e:
        logger.error(f"Error fetching roles for user {user['username']}: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching roles")
    
@router.post("/")
def create_role(role_data: RoleCreate, user=Depends(get_current_user)):
    try: 
        logger.info(f"User {user['username']} is creating a new role with data: {role_data}")
        id = create_role_service(role_data)
        logger.info(f"Role created successfully with ID: {id}")
        return f"role created with id: {id}"
    except Exception as e:
        logger.error(f"Error creating role for user {user['username']}: {str(e)}")
        raise HTTPException(status_code=500, detail="Error creating role")
        
    
@router.put("/{role_id}")
def update_role(role_id:str, role_data: RoleCreate, user=Depends(get_current_user)):
    try: 
        logger.info(f"User {user['username']} is updating role with ID: {role_id} and data: {role_data}")
        updated_values = update_role_by_id(role_id, role_data)
        logger.info(f"Role with ID {role_id} updated successfully: {updated_values.description}")
        return f"Role with ID {role_id} updated successfully: {updated_values.description}"
    except Exception as e:
        logger.error(f"Error updating role for user {user['username']}:\n{traceback.format_exc()}")
        raise HTTPException(status_code=500, detail="Error updating role")
    
@router.get("/{role_id}/permissions")
def get_permissions_by_role_id(role_id:str, user=Depends(get_current_user)):
    try: 
        logger.info(f"User {user['username']} is fetching permissions for role with ID: {role_id}")
        permissions = fetch_permissions_by_role_id(role_id)
        logger.info(f"Permissions for role ID {role_id} fetched successfully: {permissions}")
        return permissions
    except Exception as e:
        logger.error(f"Error fetching permissions for role ID {role_id}:\n{traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=f"Error fetching permissions for role ID {role_id}:\n{traceback.format_exc()}")
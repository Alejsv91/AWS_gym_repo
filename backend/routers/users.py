from fastapi.security import HTTPBearer
from fastapi import APIRouter, Depends
from core.auth import get_current_user
from services.users_service import *
from fastapi import HTTPException
from models.user import UserUpdate, UserGet, UserCreate
from core.cognito_service import *
from utils.security import *
from core.logger import logger
import traceback

security = HTTPBearer()
router = APIRouter(prefix="/users", tags=["users"])

@router.get("/", response_model=list[UserGet], status_code=200)
def get_users(user=Depends(get_current_user)):
    try: 
        return fetch_users()
    except Exception as e:
        logger.error(f"Error fetching users:\n{traceback.format_exc()}")
        raise HTTPException(status_code=500, detail="An error occurred while fetching users: " + str(e))
    
@router.get("/{user_id}", response_model=UserGet, status_code=200)
def get_user_by_id(user_id: int, user=Depends(get_current_user)):
    try:
        return fetch_user_by_id(user_id)
    except Exception as e:
        logger.error(f"Error fetching user by ID {user_id}: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while fetching the user: " + str(e))

@router.put("/{user_id}", response_model=UserGet, status_code=200)
def update_user_by_id(user_id: int, user_data: UserUpdate, user=Depends(get_current_user)):
    try: 
        currentUser = fetch_user_by_id(user_id)
        if not currentUser:
            raise HTTPException(status_code=404, detail="User not found")

        if currentUser.email != user_data.email:
            raise HTTPException(status_code=400, detail="Email cannot be changed")

        update_user(user_id, user_data)
        updated_user = fetch_user_by_id(user_id)
        logger.info(f"Updated user: {updated_user}")
        return updated_user
    except Exception as e:
        logger.error(f"Error updating user with ID {user_id}: {e}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while updating the user: " + str(e)
        )

@router.post("/", response_model=UserGet, status_code=201)
def create_new_user(user_data: UserCreate, user=Depends(get_current_user)):
    try: 
        password = generate_random_password()
        cognito_response = create_cognito_user(role_id=user_data.role_id ,email=user_data.email, temp_password=password)
        logger.info(f"Cognito response: {cognito_response}")
    except Exception as e:
        logger.error(f"Error creating Cognito user: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while creating the Cognito user: " + str(e))
    cognito_id = cognito_response.username
    logger.info(f"Cognito user created with ID: {cognito_id}")
    return create_user(user_data, cognito_id)
    
@router.delete("/{user_id}", status_code=204)
def delete_user(user_id: int, user=Depends(get_current_user)):

    currentUser = fetch_user_by_id(user_id)
    if not currentUser:
        raise HTTPException(status_code=404, detail="User not found")
    try:
        delete_cognito_user(currentUser.cognito_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail="An error occurred while deleting the Cognito user: " + str(e))
    try:    
        delete_user_by_id(user_id)
        return {"message": f"User {currentUser.first_name} deleted successfully"}
    except Exception as e:
        logger.error(f"Error deleting user with ID {user_id}: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while deleting the user: " + str(e))
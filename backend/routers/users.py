from fastapi.security import HTTPBearer
from fastapi import APIRouter, Depends
from core.auth import get_current_user
from services.users_service import fetch_users, fetch_user_by_id, update_user, create_user
from fastapi import HTTPException
from models.user import UserUpdate, UserGet, UserCreate

security = HTTPBearer()

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/", response_model=list[UserGet], status_code=200)
def get_users(user=Depends(get_current_user)):
    try: 
        return fetch_users()
    except Exception as e:
        return {"error": str(e)}
    
@router.get("/{user_id}", response_model=UserGet, status_code=200)
def get_user_by_id(user_id: int, user=Depends(get_current_user)):
    try:
        return fetch_user_by_id(user_id)
    except Exception as e:
        return {"error": str(e)}

@router.put("/{user_id}", response_model=UserGet, status_code=200)
def update_user_by_id(user_id: int, user_data: UserUpdate, user=Depends(get_current_user)):
    try: 
        currentUser= fetch_user_by_id(user_id)
        if not currentUser:
            raise HTTPException(status_code=404, detail="User not found")
        update_user(user_id, user_data)
        updated_user = fetch_user_by_id(user_id)
        print("Updated user:", updated_user)
        return updated_user
    except Exception as e:
        raise HTTPException(status_code=500, detail="An error occurred while updating the user: " + str(e))

@router.post("/", response_model=UserGet, status_code=201)
def create_new_user(user_data: UserCreate, user=Depends(get_current_user)):
        return create_user(user_data)
from fastapi.security import HTTPBearer
from fastapi import APIRouter
from core.auth import get_current_user
from fastapi import Depends
from services.identification_type_service import fetch_identification_types

security = HTTPBearer()

router = APIRouter(prefix="/identification_types", tags=["identification_types"])

@router.get("/")
def get_identification_type(user=Depends(get_current_user)):
    try: 
        return fetch_identification_types()
    except Exception as e:
        return {"error": str(e)}

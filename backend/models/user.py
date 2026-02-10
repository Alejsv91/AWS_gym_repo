from pydantic import BaseModel, Field, ConfigDict
from models.role import RoleGet
from models.identification_type import IdentificationType

class UserBase(BaseModel):
    first_name: str = Field(..., pattern=r'^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$')
    last_name: str = Field(..., pattern=r'^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$')
    id_number: str
    phone_number: str
    email: str
    address: str
    nationality: str
    
class UserCreate(UserBase):
    role_id: int
    identification_type_id: int

class UserUpdate(UserBase):
    role_id: int
    identification_type_id: int
    
class UserGet(UserBase):
    id: int
    role: RoleGet
    identification_type: IdentificationType
    cognito_id: str
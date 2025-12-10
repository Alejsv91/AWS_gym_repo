from pydantic import BaseModel, Field
from models.role import Role
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
    pass

class UserUpdate(UserBase):
    role_id: int
    Identification_type_id: int
    
class UserGet(UserBase):
    id: int
    role: Role
    identification_type: IdentificationType
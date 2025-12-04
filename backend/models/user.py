from pydantic import BaseModel, Field
from models.role import Role
from models.identification_type import IdentificationType

class User(BaseModel):
    id: int
    first_name: str = Field(..., pattern=r'^[A-Za-z]+$')
    last_name: str = Field(..., pattern=r'^[A-Za-z]+$')
    identification_type: IdentificationType
    id_number: str
    phone_number: str
    email: str
    address: str
    role: Role
    nationality: str
from pydantic import BaseModel, Field

class User(BaseModel):
    id: int
    first_name: str = Field(..., pattern=r'^[A-Za-z]+$')
    last_name: str = Field(..., pattern=r'^[A-Za-z]+$')
    identification_type: str
    id_number: str
    phone_number: str
    email: str
    address: str
    role: str
    nationality: str
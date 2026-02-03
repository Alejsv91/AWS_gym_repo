from pydantic import BaseModel

class Role(BaseModel):
    name: str
    description: str
    
class RoleCreate(Role):
    pass
    
class RoleGet(Role):
    id: int
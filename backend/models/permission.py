from pydantic import BaseModel
from models.section import SectionGet

class PermissionBase(BaseModel):
    action: str
    
class PermissionGet(PermissionBase):
    id: int
    section: SectionGet
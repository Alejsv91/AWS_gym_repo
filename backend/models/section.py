from pydantic import BaseModel

class SectionBase(BaseModel):
    name: str
    description: str
    
class SectionGet(SectionBase):
    id: int
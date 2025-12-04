from pydantic import BaseModel, Field

class IdentificationType(BaseModel):
    id: int
    name: str
    description: str
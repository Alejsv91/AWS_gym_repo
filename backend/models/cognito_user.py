from pydantic import BaseModel

class CognitoUser(BaseModel):
    username: str
    status: str
    email: str
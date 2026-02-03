import os
import requests
from jose import jwt
from fastapi import HTTPException, Depends
from dotenv import load_dotenv
from fastapi.security import HTTPBearer

load_dotenv()
security = HTTPBearer()

COGNITO_REGION = os.getenv("COGNITO_REGION")
USERPOOL_ID = os.getenv("USERPOOL_ID")
APP_CLIENT_ID = os.getenv("APP_CLIENT_ID")
ISSUER = f"https://cognito-idp.{COGNITO_REGION}.amazonaws.com/{USERPOOL_ID}"
JWKS_URL = f"{ISSUER}/.well-known/jwks.json"
KID = 'kid'

jwks = requests.get(JWKS_URL).json()["keys"]

def verify_token(token: str):
    try:
        # get the kid from the headers prior to verification
        headers = jwt.get_unverified_header(token)
        kid = headers[KID]

        # search for the kid in the downloaded public keys
        key = next((k for k in jwks if k[KID] == kid), None)
        if key is None:
            raise HTTPException(status_code=401, detail="public key not found in jwks")

        # decode and verify the token
        payload = jwt.decode(
            token,
            key,                       
            algorithms=["RS256"],
            audience=APP_CLIENT_ID,
            issuer=ISSUER
        )
        print("-------------")
        print("Token payload:", payload)
        print("-------------")
        return payload

    except Exception as e:
        raise HTTPException(status_code=401, detail=f"invalid token: {str(e)}")
    

def get_current_user(credentials=Depends(security)):
    token = credentials.credentials
    print("-------------")
    print("Credentials received:", credentials)
    print("-------------")
    try:
        payload = verify_token(token)
        return payload
    except Exception:
        raise HTTPException(status_code=401, detail="invalid token")

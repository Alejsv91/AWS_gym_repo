import os
import requests
from jose import jwt
from fastapi import HTTPException

COGNITO_REGION = os.getenv("COGNITO_REGION")
USERPOOL_ID = os.getenv("USERPOOL_ID")
APP_CLIENT_ID = os.getenv("APP_CLIENT_ID")
ISSUER = f"https://cognito-idp.{COGNITO_REGION}.amazonaws.com/{USERPOOL_ID}"
JWKS_URL = f"{ISSUER}/.well-known/jwks.json"

jwks = requests.get(JWKS_URL).json()["keys"]

def verify_token(token: str):
    try:
        # get the kid from the headers prior to verification
        headers = jwt.get_unverified_header(token)
        kid = headers["kid"]

        # search for the kid in the downloaded public keys
        key = next((k for k in jwks if k["kid"] == kid), None)
        if key is None:
            raise HTTPException(status_code=401, detail="Clave pública no encontrada en JWKS")

        # decode and verify the token
        payload = jwt.decode(
            token,
            key,                       
            algorithms=["RS256"],
            audience=APP_CLIENT_ID,
            issuer=ISSUER
        )
        return payload

    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Token inválido: {str(e)}")

from fastapi import FastAPI, Depends, HTTPException
from dotenv import load_dotenv
from fastapi.security import OAuth2PasswordBearer
import psycopg2
import os
import jwt
import requests


load_dotenv()
app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

COGNITO_POOL_ID = os.getenv("COGNITO_POOL_ID")
COGNITO_REGION = os.getenv("COGNITO_REGION")
COGNITO_KEYS_URL = f"https://cognito-idp.{COGNITO_REGION}.amazonaws.com/{COGNITO_POOL_ID}/.well-known/jwks.json"
COGNITO_CLIENT_ID = os.getenv("COGNITO_CLIENT_ID")

jwks = requests.get(COGNITO_KEYS_URL).json()

def verify_token(token: str):
    try: 
        decode = jwt.decode(toke, jwks, algorithms=['RS256'], audience=COGNITO_CLIENT_ID)
        return decode
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

def get_connection():
    return psycopg2.connect(
        dbname=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT")
    )
    
@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI"}

@app.get("/roles")
def get_roles(token: str = Depends(oauth2_scheme)):
    try: 
        payload = verify_token(token)
        conn = get_connection()
        cur = conn.cursor()
        cur.execute("SELECT * FROM roles;")
        rows = cur.fetchall()
        cur.close()
        conn.close()
        return [
            {"id": r[0], "name": r[1], "description": r[2]}
            for r in rows
        ]
    except Exception as e:
        return {"error": str(e)}
    
@app.get("/protected")
def protected_route(token: str = Depends(oauth2_scheme)):
    payload = verify_token(token)
    return {"message": "You are authorized", "user": payload} 

    

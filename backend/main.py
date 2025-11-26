from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import HTTPBearer
from core.auth import verify_token
from dotenv import load_dotenv
import psycopg2
import os

load_dotenv()
app = FastAPI()
security = HTTPBearer()

def get_connection():
    return psycopg2.connect(
        dbname=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT")
    )

def get_current_user(credentials=Depends(security)):
    token = credentials.credentials
    try:
        payload = verify_token(token)
        return payload
    except Exception:
        raise HTTPException(status_code=401, detail="Token inválido")

@app.get("/secure-data")
def secure_data(user=Depends(get_current_user)):
    return {"message": "Acceso autorizado", "user": user}

@app.get("/roles")
def get_roles():
    try: 
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

    

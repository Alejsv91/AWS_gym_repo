from fastapi import FastAPI
import psycopg2
import os

app = FastAPI()

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

@app.get("/health")
def health_check():
    try:
        conn = get_connection()
        cur = conn.cursor()
        cur.execute("SELECT 1;")
        result = cur.fetchone()
        cur.close()
        conn.close()
        return {"status": "ok", "db_response": result[0]}
    except Exception as e:
        return {"status": "error", "detail": str(e)}

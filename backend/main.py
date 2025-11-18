from fastapi import FastAPI
import psycopg2

app = FastAPI()

def get_connection():
    return psycopg2.connect(
        dbname="postgres",
        user="postgres",
        password="postgres",
        host="db",
        port="5432"
    )

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI"}

@app.get("/users")
def get_users():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT id, name FROM users;")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return {"users": rows}

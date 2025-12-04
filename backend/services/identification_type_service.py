from core.db import get_connection

def fetch_identification_types():
    conn = get_connection()
    try:
        cur = conn.cursor()
        cur.execute("SELECT * FROM identification_type")
        rows = cur.fetchall()
        return [{"id": r[0], "name": r[1], "description": r[2]} for r in rows]
    finally:
        cur.close()
        conn.close()
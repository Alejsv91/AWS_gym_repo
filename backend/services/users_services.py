from core.db import get_connection
from models.users import User

def fetch_users():
    conn = get_connection()
    try:
        cur = conn.cursor()
        cur.execute("SELECT * FROM users;")
        rows = cur.fetchall()
        return [User(id=r[0], first_name=[1]
                    #  , last_name=[2], address=[3],
                    #  phone_number=[4], nationality=[5], id_number=[6],
                    #  identification_type=[7]
                     ) for r in rows]
    finally:
        cur.close()
        conn.close()
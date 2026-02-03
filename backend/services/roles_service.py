from core.db import get_connection
from models.role import RoleGet, RoleCreate
from repositories.role_queries import *


def create_role(role_data: RoleCreate):
    conn = get_connection()
    try: 
        cur = conn.cursor()
        cur.execute(CREATE_ROLE_QUERY, 
                    (role_data.name, role_data.description))
        role_id = cur.fetchone()[0]
        conn.commit()
        return {"id": role_id, "message": "Role created successfully"}
    finally:
        cur.close()
        conn.close()

def fetch_roles():
    conn = get_connection()
    try:
        cur = conn.cursor()
        cur.execute(SELECT_ALL_ROLES_QUERY)
        rows = cur.fetchall()
        return [create_role_object(row) for row in rows]
    finally:
        cur.close()
        conn.close()
        
def create_role_object(row) -> RoleGet:
    role = RoleGet(
        id=row[0],
        name=row[1],
        description=row[2]
    )
    return role
from core.db import get_connection
from models.role import RoleGet, RoleCreate
from repositories.role_queries import *
from core.logger import logger
import traceback

def fetch_role_by_id(role_id: int):
    conn = get_connection()
    try:
        cur = conn.cursor()
        logger.debug(f"Fetching role with ID: {role_id}")
        cur.execute(SELECT_ROLE_BY_ID_QUERY, (role_id,))
        row = cur.fetchone()
        if row:
            logger.debug(f"Role found: {row}")
            return create_role_object(row)
        else:
            return None
    except Exception as e:
        logger.error(f"Error getting role: \n{traceback.format_exc()}")
    finally:
        cur.close()
        conn.close()

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
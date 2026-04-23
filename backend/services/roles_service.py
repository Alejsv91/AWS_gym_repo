from core.db import get_connection
from models.role import RoleGet, RoleCreate
from repositories.role_queries import *
from core.logger import logger
from fastapi import HTTPException
from models.permission import PermissionGet
from models.section import SectionGet
import traceback

def fetch_permissions_by_role_id(role_id: int):
    conn = get_connection()
    try:
        cur = conn.cursor()
        logger.debug(f"Fetching permissions for role ID: {role_id}")
        query = SELECT_PERMISSIONS_BY_ROLE_ID_QUERY
        cur.execute(query, (role_id,))
        rows = cur.fetchall()
        # logger.log(f"Permissions query executed successfully, rows fetched: {len(rows)}")
        permissions = []
        for row in rows:
            permission= create_permissions_object(row)
            permissions.append(permission)
        logger.debug(f"Permissions found: {permissions}")
        return permissions
    except Exception as e:
        logger.error(f"Error fetching permissions:\n{traceback.format_exc()}")
        raise HTTPException(status_code=500, detail="Error fetching permissions")
    finally:
        cur.close()
        conn.close()

def update_role_by_id(role_id: int, role_data: RoleCreate):
    conn = get_connection()
    try:
        cur = conn.cursor()
        logger.debug(f"Updating role with ID: {role_id} using data: {role_data}")
        query = UPDATE_ROLE_QUERY
        cur.execute(query, 
                    (role_data.name, role_data.description, role_id))
        conn.commit()
    except Exception as e:
        logger.error(f"Error updating role:\n{traceback.format_exc()}")
        raise HTTPException(status_code=500, detail="Error updating role")
    finally:
        cur.close()
        conn.close()    
    return (fetch_role_by_id(role_id))

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

def create_role_service(role_data: RoleCreate):
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

def create_permissions_object(row) -> PermissionGet:
    logger.debug(f"Creating permission object from row: {row}")
    logger.debug(f"Adding Section")
    section= SectionGet(
            id=row[2],
            name=row[3],
            description=row[4]
    )
    # section.id = row[2]
    # section.name = row[3]
    # section.description = row[4]
    logger.debug(f"Section object created: {section}")
    logger.debug(f"Creating Permission object")
    permission = PermissionGet(
        id=row[0],
        action=row[1],
        section=section
    )
    logger.debug(f"Permission object created: {permission}")
    return permission
    

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
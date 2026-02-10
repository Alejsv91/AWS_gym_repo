from core.db import get_connection
from models.user import UserGet, UserUpdate, UserCreate
from models.role import Role
from models.identification_type import IdentificationType
from repositories.user_queries import *
from fastapi import HTTPException
import os
from core.cognito_service import delete_cognito_user 
from core.logger import logger

USER_POOL_ID = os.getenv("USERPOOL_ID")

def delete_user_by_id(user_id: int):
    conn = get_connection()
    cur = None
    try: 
        cur = conn.cursor()
        logger.info(f"Starting process to delete user with ID:{user_id}")
        query = DELETE_USER_QUERY
        cur.execute(query, (user_id,))
        conn.commit() 
        logger.info(f"User with ID deleted: {user_id}")
        return True
    except Exception as e:
        logger.error("Error deleting user:", e)
        translate_error(e)
    finally:
        logger.info("Closing connection after deleting user")
        cur.close()
        conn.close()
    

def update_user(user_id: int, user_data: UserUpdate):
    conn = get_connection()
    cur = None
    try:
        cur = conn.cursor()
        logger.info("Updating user with ID:", user_id)
        query = UPDATE_USER_QUERY
        values = (user_data.first_name, user_data.last_name, user_data.identification_type_id, 
                  user_data.id_number, user_data.phone_number, user_data.email, user_data.address, 
                  user_data.role_id, user_data.nationality, user_id)
        logger.info("Executing update with values:", values)
        cur.execute(query, values)
        conn.commit() 
        return True
    except Exception as e:  
        logger.error("Error updating user:", e)
        translate_error(e)
    finally:
        logger.info("Closing connection after updating user")
        cur.close()
        conn.close()

def create_user(user_data: UserCreate, cognito_id: str):
    conn = get_connection()
    try:
        logger.info('Creating user with data:', user_data)
        cur = conn.cursor()
        query = CREATE_USER_QUERY
        values = (user_data.first_name, user_data.last_name, user_data.identification_type_id,
                  user_data.id_number, user_data.phone_number, user_data.email,
                  user_data.address, user_data.role_id, user_data.nationality, cognito_id)
        cur.execute(query, values)
        logger.info("Executed create user with values:", values)
        new_id = cur.fetchone()[0]
        conn.commit()
        logger.info("User created with ID:", new_id)
        return fetch_user_by_id(new_id)
    except Exception as e:
        logger.error("Error creating user:", e)
        translate_error(e)
        delete_cognito_user(username=cognito_id)
        raise HTTPException(status_code=500, detail="An error occurred while creating the user: " + str(e))
    finally:
        logger.error("Closing connection after creating user")
        cur.close()
        conn.close()

def fetch_user_by_id(user_id: int):
    conn = get_connection()
    try: 
        logger.info(f"Fetching user by ID:{user_id}")
        cur = conn.cursor()
        query = FETCH_USER_BY_ID_QUERY
        cur.execute(query, (user_id,))
        logger.info("Executed query to fetch user by ID")
        row = cur.fetchone()
        user = create_user_object(row)
        logger.info(f"Fetched user:{user}")
        return user
    except Exception as e:
        logger.error(f"Error fetching user by ID: {e}")
        raise HTTPException(status_code=500, detail=f"An error occurred while fetching the user: {str(e)}")
    finally:
        logger.info("Closing connection after fetching user by ID")
        cur.close()
        conn.close()

def fetch_users():
    conn = get_connection()
    try:
        logger.debug("-----Fetching all users-----")
        cur = conn.cursor()
        query = FETCH_USERS_QUERY
        cur.execute(query)
        logger.info("Executed query to fetch users")
        rows = cur.fetchall()
        users = []
        logger.debug(f"Database response: {rows}")
        for row in rows:
            logger.debug(f"Processing row: {row}")
            user = create_user_object(row)
            logger.debug(f"Created user object: {user.id}")
            users.append(user)
        return users
    finally:
        cur.close()
        conn.close()
        
def email_or_id_exists(conn, email: str, id_number: str) -> bool:
    cur = conn.cursor()
    query = EMAIL_OR_ID_EXISTS_QUERY
    cur.execute(query, (email, id_number))
    count = cur.fetchone()[0]
    cur.close()
    return count > 0

def create_user_object(row) -> UserGet:
    role = Role(id=row[8], name=row[9], description=row[10])
    logger.info(f"Role created:{role.name}")
    identification_type = IdentificationType(
        id=row[11], name=row[12], description=row[13]
    )
    logger.info(f"Identification Type created: {identification_type.name}")
    user = UserGet(
        id=row[0],
        first_name=row[1],
        last_name=row[2],  
        id_number=row[3],
        phone_number=row[4],
        email=row[5],
        address=row[6],
        nationality=row[7], 
        role=role,
        identification_type=identification_type,
        cognito_id=row[14]
    )
    logger.info(f"User created id: {user.id}")
    return user

def translate_error(e: Exception):
    if "users_id_number_key" in str(e):
        logger.error("ID number already exists error detected")
        raise HTTPException(status_code=400, detail="ID number already exists for other user")
    if "users_email_key" in str(e):
        logger.error("Email already exists error detected")
        raise HTTPException(status_code=400, detail="Email already exists for other user")
    raise HTTPException(status_code=400, detail=e)
    
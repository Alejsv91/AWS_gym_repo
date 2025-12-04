from core.db import get_connection
from models.user import User
from models.role import Role
from models.identification_type import IdentificationType

def fetch_users():
    conn = get_connection()
    try:
        cur = conn.cursor()
        query = """
        SELECT 
            u.id, u.first_name, u.last_name, u.id_number, u.phone_number,
            u.email, u.address, u.nationality,
            r.id, r.name, r.description,
            it.id, it.name, it.description
        FROM users u
        JOIN roles r ON u.role_id = r.id
        JOIN identification_type it ON u.identification_type_id = it.id;
    """
        cur.execute(query)
        rows = cur.fetchall()
        users = []
        for row in rows:
            role = Role(id=row[8], name=row[9], description=row[10])
            identification_type = IdentificationType(
                id=row[11], name=row[12], description=row[13]
            )
            user = User(
                id=row[0],
                first_name=row[1],
                last_name=row[2],  
                id_number=row[3],
                phone_number=row[4],
                email=row[5],
                address=row[6],
                nationality=row[7], 
                role=role,
                identification_type=identification_type
            )
            users.append(user)
        return users
    finally:
        cur.close()
        conn.close()
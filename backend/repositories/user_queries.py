UPDATE_USER_QUERY = """UPDATE users
                SET first_name = %s, 
                last_name = %s, 
                identification_type_id = %s,
                id_number = %s, 
                phone_number= %s, 
                email=%s, 
                address= %s, 
                role_id=%s,
                nationality=%s
                WHERE id=   %s;
                """
FETCH_USER_BY_ID_QUERY = """
        SELECT 
        u.id,
        u.first_name,
        u.last_name,
        u.id_number,
        u.phone_number,
        u.email,
        u.address,
        u.nationality,
        r.id AS role_id,
        r.name AS role_name,
        r.description AS role_description,
        it.id AS identification_type_id,
        it.name AS identification_type_name,
        it.description AS identification_type_description
        FROM users u
        JOIN roles r ON u.role_id = r.id
        JOIN identification_type it ON u.identification_type_id = it.id
        WHERE u.id = %s;
        """
FETCH_USERS_QUERY = """
        SELECT 
            u.id, u.first_name, u.last_name, u.id_number, u.phone_number,
            u.email, u.address, u.nationality,
            r.id, r.name, r.description,
            it.id, it.name, it.description
        FROM users u
        JOIN roles r ON u.role_id = r.id
        JOIN identification_type it ON u.identification_type_id = it.id;
    """
SELECT_ROLE_BY_ID_QUERY = """
SELECT id, name, description 
FROM roles WHERE id = %s;
"""

SELECT_ALL_ROLES_QUERY = """
SELECT id, name, description FROM roles;
"""

CREATE_ROLE_QUERY = """
INSERT INTO roles 
(name, description) 
VALUES (%s, %s) RETURNING id;
"""


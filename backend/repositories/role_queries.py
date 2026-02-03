SELECT_ALL_ROLES_QUERY = """
SELECT id, name, description FROM roles;
"""

CREATE_ROLE_QUERY = """
INSERT INTO roles 
(name, description) 
VALUES (%s, %s) RETURNING id;
"""
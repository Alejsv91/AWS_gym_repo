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

UPDATE_ROLE_QUERY = """
UPDATE roles
SET name=%s, description=%s
WHERE id=%s;
"""

SELECT_PERMISSIONS_BY_ROLE_ID_QUERY = """
SELECT *
FROM role_permissions
-- JOIN roles ON role_permissions.role_id = roles.id
JOIN permissions ON role_permissions.permission_id = permissions.id
JOIN sections ON sections.id = permissions.section_id
WHERE role_id=%s;
"""


const PERMISSIONS = '/permissions';
const GYMS = '/gyms';
const USERS = '/users';
const ROLES = '/roles';
const IDENTIFICATION_TYPES = '/identification-types';
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const PERMISSION_ENDPOINTS = {
    getPermissions: `${PERMISSIONS}`,
    getPermissionsByRoleId: (roleId: string) => `/${roleId}${PERMISSIONS}`
}

export const GYM_ENDPOINTS = {
    getGyms: `${API_BASE_URL}${GYMS}`
};

export const ROLE_ENDPOINTS = {
    getRoles: `${ROLES}`,
    getRoleById: (id: string) => `${ROLES}/${id}`,
}

export const USER_ENDPOINT = {
    getUsers: `${USERS}`,
    getUserById: (id: string) => `${USERS}/${id}`,
    updateUser: (id: string) => `${USERS}/${id}`,
    createUser: `${USERS}`,    
    deleteUser: (id: string) => `${USERS}/${id}`
}

export const IDENTIFICATION_TYPES_ENDPOINT = {
    getIdentificationTypes: `${IDENTIFICATION_TYPES}`

};

export const NATIONALITIES_ENDPOINT = {
    getNationalities: 'https://restcountries.com/v3.1/all?fields=name,cca2'
}


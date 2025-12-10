const GYMS = '/gyms';
const USERS = '/users';
const ROLES = '/roles/';
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const GYM_ENDPOINTS = {
    getGyms: `${API_BASE_URL}${GYMS}`
};

export const ROLE_ENDPOINTS = {
    getRoles: `${ROLES}`
}

export const USER_ENDPOINT = {
    getUsers: `${USERS}`,
    getUserById: (id: string) => `${USERS}/${id}`
}


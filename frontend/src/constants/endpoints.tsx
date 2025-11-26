const GYMS = '/gyms';
const USERS = '/users';
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const GYM_ENDPOINTS = {
    getGyms: `${API_BASE_URL}${GYMS}`
};

export const USER_ENDPOINT = {
    getUsers: `${API_BASE_URL}${USERS}`
}
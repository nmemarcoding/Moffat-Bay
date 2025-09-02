// src/services/apiService.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
});

const AUTH_HEADER = 'Authorization';

const getToken = () => localStorage.getItem('authToken');
const setToken = (t) => localStorage.setItem('authToken', t);
const clearToken = () => localStorage.removeItem('authToken');

const setUserInfo = (u) => {
  localStorage.setItem('userInfo', JSON.stringify(u));
  try { window.dispatchEvent(new Event('auth-user-updated')); } catch {}
};
const clearUserInfo = () => {
  localStorage.removeItem('userInfo');
  try { window.dispatchEvent(new Event('auth-user-updated')); } catch {}
};

export const logout = () => {
  clearToken();
  clearUserInfo();
  console.log('User logged out; authToken and userInfo cleared');
};

// Attach token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      const hasBearer = token.toLowerCase().startsWith('bearer ');
      config.headers[AUTH_HEADER] = hasBearer ? token : `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Capture refreshed token; store user on /login or /register
api.interceptors.response.use(
  (response) => {
    const newToken = response.headers?.authorization; // axios lowercases keys
    if (newToken) setToken(newToken);

    const path = (response.config?.url || '').toLowerCase();
    const isAuthCall = path.endsWith('/login') || path.endsWith('/register');
  if (isAuthCall && response.data) setUserInfo(response.data);

    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      console.log('401 from API, logging out');
      logout();
    }
    return Promise.reject(error);
  }
);

// --- API calls matching your model ---
export const register = (payload) =>
  // { email, password, firstName, lastName, telephone, isAdmin }
  api.post('/register', payload);

export const login = (payload) =>
  // { email, password }
  api.post('/login', payload);

// Validate token via backend endpoint
export const validateToken = async () => {
  const token = getToken();
  if (!token) return false;
  try {
    const res = await api.post('/check-token', null); // interceptor adds header
    const ok =
      res.status === 200 &&
      (typeof res.data !== 'string' || res.data.startsWith('Token is valid'));
    if (!ok) logout();
    return ok;
  } catch (err) {
    console.error('Token validation error:', err);
    logout();
    return false;
  }
};

export default api;

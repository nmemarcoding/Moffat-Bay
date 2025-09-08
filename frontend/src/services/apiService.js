// src/services/apiService.js
import axios from 'axios';

/* ---------- Constants ---------- */

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';
const AUTH_HEADER = 'Authorization';
const TOKEN_KEY = 'authToken';
const USER_INFO_KEY = 'userInfo';

/* ---------- Storage Helpers ---------- */

const getToken = () => localStorage.getItem(TOKEN_KEY);
const setToken = t => localStorage.setItem(TOKEN_KEY, t);
const clearToken = () => localStorage.removeItem(TOKEN_KEY);

const safeDispatchAuthEvent = () => {
  try {
    window.dispatchEvent(new Event('auth-user-updated'));
  } catch {
    /* no-op */
  }
};

const setUserInfo = u => {
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(u));
  safeDispatchAuthEvent();
};

const clearUserInfo = () => {
  localStorage.removeItem(USER_INFO_KEY);
  safeDispatchAuthEvent();
};

export const logout = () => {
  clearToken();
  clearUserInfo();
  console.log('User logged out; authToken and userInfo cleared');
};

/* ---------- Axios Instance ---------- */

const api = axios.create({ baseURL: BASE_URL });

// Attach token
api.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      const hasBearer = token.toLowerCase().startsWith('bearer ');
      config.headers[AUTH_HEADER] = hasBearer ? token : `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Capture refreshed token; store user on /login or /register
api.interceptors.response.use(
  response => {
    // axios lowercases header keys; also support exact-case for safety
    const newToken =
      response.headers?.authorization ||
      response.headers?.Authorization ||
      null;

    if (newToken) setToken(newToken);

    const path = (response.config?.url || '').toLowerCase();
    const isAuthCall = path.endsWith('/login') || path.endsWith('/register');

    if (isAuthCall && response.data) setUserInfo(response.data);

    return response;
  },
  error => {
    if (error?.response?.status === 401) {
      console.log('401 from API, logging out');
      logout();
    }
    return Promise.reject(error);
  }
);

/* ---------- API Calls (matching your model) ---------- */

export const register = payload =>
  // { email, password, firstName, lastName, telephone, isAdmin }
  api.post('/register', payload);

export const login = payload =>
  // { email, password }
  api.post('/login', payload);

export const getAvailableRooms = (checkIn, checkOut, guests) => {
  return api.get('/rooms/available', {
    params: { checkIn, checkOut, guests }
  });
};

export const createReservation = reservationData =>
  api.post('/reservations', reservationData);


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

// Landing page API calls
export const getRooms = () => api.get('/rooms');

export const submitContactForm = contactData =>
  api.post('/landing/contact', contactData);

export const getLandingInfo = () => api.get('/landing/info');

export const getHotelStats = () => api.get('/landing/stats');

export default api;

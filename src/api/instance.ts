import axios from 'axios';
import {getRefreshToken, getToken} from '../utils';

export const instance = axios.create({
  baseURL: 'https://dummyjson.com/auth',
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshToken = async () => {
  const refreshTokenFromKeychain = await getRefreshToken();

  if (!refreshTokenFromKeychain) {
    return null;
  }

  try {
    const response = await axios.post('https://dummyjson.com/auth/refresh', {
      refreshToken: refreshTokenFromKeychain,
    });

    return response.data.refreshToken;
  } catch (error: any) {
    console.log(error.response.data);
    throw error;
  }
};

instance.interceptors.request.use(async config => {
  const token = await getToken();

  if (token) {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshToken();

        instance.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

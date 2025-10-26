import axios from 'axios';

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 15000,
});

client.interceptors.response.use(
  res => res,
  err => {
    // You can centralize error logging/toast here
    return Promise.reject(err);
  }
);

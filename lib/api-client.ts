import { api } from './api';

// Thin wrapper around axios instance to centralize error shaping and defaults
export async function get<T = any>(url: string, params?: any): Promise<T> {
  const resp = await api.get(url, { params });
  return resp.data as T;
}

export async function post<T = any, B = any>(url: string, body?: B): Promise<T> {
  const resp = await api.post(url, body);
  return resp.data as T;
}

export async function put<T = any, B = any>(url: string, body?: B): Promise<T> {
  const resp = await api.put(url, body);
  return resp.data as T;
}

export async function del<T = any>(url: string): Promise<T> {
  const resp = await api.delete(url);
  return resp.data as T;
}

export const apiClient = {
  get,
  post,
  put,
  del,
};

export default apiClient;

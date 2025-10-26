'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import type { UseQueryOptions, UseQueryResult, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import apiClient, { get as apiGet, post as apiPost, put as apiPut, del as apiDel } from '@/lib/api-client';

// Simple typed wrapper around useQuery that expects a key and a URL (or any async fn)
export function useApiQuery<T = any>(
  key: string | readonly unknown[],
  urlOrFn: string | (() => Promise<T>),
  options?: UseQueryOptions<T>
): UseQueryResult<T> {
  const queryKey = Array.isArray(key) ? key : [key];

  const queryFn = async () => {
    if (typeof urlOrFn === 'string') {
      return await apiGet<T>(urlOrFn);
    }
    return await urlOrFn();
  };

  return useQuery<T>({ queryKey, queryFn, ...(options as any) });
}

// Wrapper for mutations. Accepts an async function (e.g. (payload) => apiClient.post(...))
export function useApiMutation<TInput = any, TOutput = any>(
  fn: (input: TInput) => Promise<TOutput>,
  options?: UseMutationOptions<TOutput, unknown, TInput>
): UseMutationResult<TOutput, unknown, TInput> {
  return useMutation<TOutput, unknown, TInput>({ mutationFn: fn, ...(options as any) });
}

// Convenience helpers for common patterns
export function useGetUrl<T = any>(key: string | readonly unknown[], url: string, options?: UseQueryOptions<T>) {
  return useApiQuery<T>(key, url, options);
}

// Simpler version that uses URL as the key
export function useGet<T = any>(url: string, options?: UseQueryOptions<T>) {
  return useApiQuery<T>(url, url, options);
}

export function useCreate<TInput = any, TOutput = any>(url: string, options?: UseMutationOptions<TOutput, unknown, TInput>) {
  return useApiMutation<TInput, TOutput>((payload: TInput) => apiPost<TOutput, TInput>(url, payload), options);
}

export function useUpdate<TInput = any, TOutput = any>(url: string, options?: UseMutationOptions<TOutput, unknown, TInput>) {
  return useApiMutation<TInput, TOutput>((payload: TInput) => apiPut<TOutput, TInput>(url, payload), options);
}

export function useDelete<TInput = any, TOutput = any>(url: string, options?: UseMutationOptions<TOutput, unknown, TInput>) {
  // delete may accept an identifier or body. If payload is primitive, we append it to the URL.
  return useApiMutation<TInput, TOutput>(async (payload: TInput) => {
    if (payload === undefined || payload === null) {
      return await apiDel<TOutput>(url);
    }

    // primitive id -> append to url
    if (typeof payload === 'string' || typeof payload === 'number') {
      const target = `${url.replace(/\/$/, '')}/${payload}`;
      return await apiDel<TOutput>(target);
    }

    // otherwise, call delete on the URL and let server accept body if supported
    return await apiDel<TOutput>(url);
  }, options);
}

export default {
  useApiQuery,
  useApiMutation,
  useGetUrl,
  useGet,
  useCreate,
  useUpdate,
  useDelete,
};

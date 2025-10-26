import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { client } from './client';

export function useAssetsList(params?: { page?: number; q?: string }) {
  return useQuery({
    queryKey: ['assets', params],
    queryFn: async () => {
      const res = await client.get('/assets', { params });
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
}

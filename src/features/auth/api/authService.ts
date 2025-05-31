import { apiClient } from '@/lib/api-client';

interface authRes {
  token: string;
}

export const createToken = async (
  id: string,
  password: string,
  signal?: AbortSignal
): Promise<authRes> => {
  const res = await apiClient.post<authRes>(
    `/auth/token`,
    { id: id, password: password },
    { signal: signal }
  );
  return res.data;
};

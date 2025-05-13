import { apiClient } from '@/lib/apiClient';
import { League, LeagueFormData } from '@/types/league';

export const fetchLeague = async (id: string, signal?: AbortSignal): Promise<League> => {
  const params = { id: id };
  const res = await apiClient.get<League>(`/league`, { params: params, signal: signal });
  return res.data;
};

export const createLeague = async (
  league: LeagueFormData,
  signal?: AbortSignal
): Promise<League> => {
  const res = await apiClient.post<League>('/league', league, { signal: signal });
  return res.data;
};

export const updateLeague = async (league: League, signal?: AbortSignal): Promise<League> => {
  const res = await apiClient.put<League>('/league', league, { signal: signal });
  return res.data;
};

export const deleteLeague = async (
  id: string,
  signal?: AbortSignal
): Promise<Pick<League, 'id'>> => {
  const params = { id: id };
  const res = await apiClient.delete<Pick<League, 'id'>>('/league', {
    params: params,
    signal: signal,
  });
  return res.data;
};

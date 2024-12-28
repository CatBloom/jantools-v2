import { apiClient } from '../../../apiClient';
import { League, ReqCreateLeague, ResDeleteLeague } from '../../../types/league';

export const fetchLeague = async (id: string, signal?: AbortSignal): Promise<League> => {
  const params = { id: id };
  const res = await apiClient.get<League>(`/league`, { params: params, signal: signal });
  return res.data;
};

export const createLeague = async (
  league: ReqCreateLeague,
  signal?: AbortSignal
): Promise<League> => {
  const res = await apiClient.post<League>('/league', league, { signal: signal });
  return res.data;
};

export const updateLeague = async (league: League, signal?: AbortSignal): Promise<League> => {
  const res = await apiClient.put<League>('/league', league, { signal: signal });
  return res.data;
};

export const deleteLeague = async (id: string, signal?: AbortSignal): Promise<ResDeleteLeague> => {
  const params = { id: id };
  const res = await apiClient.delete<ResDeleteLeague>('/league', {
    params: params,
    signal: signal,
  });
  return res.data;
};

import { League, ReqCreateLeague, ResDeleteLeague } from '../../types/league';
import { apiClient } from '../apiClient';

export const fetchLeague = async (id: string): Promise<League> => {
  const params = { id: id };
  try {
    const res = await apiClient.get<League>(`/league`, { params: params });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const createLeague = async (league: ReqCreateLeague): Promise<League> => {
  try {
    const res = await apiClient.post<League>('/league', league);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const updateLeague = async (league: League): Promise<League> => {
  try {
    const res = await apiClient.put<League>('/league', league);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const deleteLeague = async (id: string): Promise<ResDeleteLeague> => {
  const params = { id: id };
  try {
    const res = await apiClient.delete<ResDeleteLeague>('/league', { params: params });
    return res.data;
  } catch (err) {
    throw err;
  }
};

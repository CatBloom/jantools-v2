import { Game, GameFormData } from '@/types/game';
import { apiClient } from '@/lib/apiClient';

export const fetchGameList = async (lid: string, signal?: AbortSignal): Promise<Game[]> => {
  const params = { leagueId: lid };
  const res = await apiClient.get<Game[]>(`/game/list`, { params: params, signal: signal });
  return res.data;
};

export const fetchGame = async (id: string, lid: string, signal?: AbortSignal): Promise<Game> => {
  const params = { id: id, leagueID: lid };
  const res = await apiClient.get<Game>(`/game`, { params: params, signal: signal });
  return res.data;
};

export const createGame = async (
  game: GameFormData,
  token: string,
  signal?: AbortSignal
): Promise<Game> => {
  const res = await apiClient.post<Game>(`/game`, game, {
    signal: signal,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// 未実装
// export const updateGame = async (game: Game, signal?: AbortSignal): Promise<Game> => {
//   const res = await apiClient.put<Game>(`/game`, game, { signal: signal });
//   return res.data;
// };

export const deleteGame = async (
  id: string,
  token: string,
  signal?: AbortSignal
): Promise<Pick<Game, 'id'>> => {
  const params = { id: id };
  const res = await apiClient.delete<Pick<Game, 'id'>>(`/game`, {
    params: params,
    signal: signal,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

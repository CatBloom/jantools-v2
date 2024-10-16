import { Game, ReqCreateGame, ResDeleteGame } from '../../types/game';
import { apiClient } from '../apiClient';

export const fetchGameList = async (lid: string, signal?: AbortSignal): Promise<Game[]> => {
  const params = { leagueId: lid };
  try {
    const res = await apiClient.get<Game[]>(`/game/list`, { params: params, signal: signal });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const fetchGame = async (id: string, lid: string, signal?: AbortSignal): Promise<Game> => {
  const params = { id: id, leagueID: lid };
  try {
    const res = await apiClient.get<Game>(`/game`, { params: params, signal: signal });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const createGame = async (game: ReqCreateGame, signal?: AbortSignal): Promise<Game> => {
  try {
    const res = await apiClient.post<Game>(`/game`, game, { signal: signal });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const updateGame = async (game: Game, signal?: AbortSignal): Promise<Game> => {
  try {
    const res = await apiClient.put<Game>(`/game`, game, { signal: signal });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const deleteGame = async (
  id: string,
  lid: string,
  signal?: AbortSignal
): Promise<ResDeleteGame> => {
  const params = { id: id, leagueID: lid };
  try {
    const res = await apiClient.delete<ResDeleteGame>(`/game`, { params: params, signal: signal });
    return res.data;
  } catch (err) {
    throw err;
  }
};

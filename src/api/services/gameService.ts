import { Game, GameID } from '../../types/game';
import { apiClient } from '../apiClient';

export const fetchGameList = async (lid: string): Promise<Game[]> => {
  const params = { leagueId: lid };
  try {
    const res = await apiClient.get<Game[]>(`/game/list`, { params: params });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const fetchGame = async (id: string, lid: string): Promise<Game> => {
  const params = { id: id, leagueID: lid };
  try {
    const res = await apiClient.get<Game>(`/game`, { params: params });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const createGame = async (game: Game): Promise<Game> => {
  try {
    const res = await apiClient.post<Game>(`/game`, game);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const updateGame = async (game: Game): Promise<Game> => {
  try {
    const res = await apiClient.put<Game>(`/game`, game);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const deleteGame = async (id: string, lid: string): Promise<GameID> => {
  const params = { id: id, leagueID: lid };
  try {
    const res = await apiClient.delete<GameID>(`/game`, { params: params });
    return res.data;
  } catch (err) {
    throw err;
  }
};

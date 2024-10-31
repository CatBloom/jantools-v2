import axios from 'axios';
import { Game, ReqCreateGame } from '../../../types/game';
import { useRecoilState } from 'recoil';
import { gameListAtom } from '../../../recoil/atoms';
import { useState } from 'react';
import {
  createGame,
  deleteGame,
  fetchGame,
  fetchGameList,
  updateGame,
} from '../../../api/services/';

export const useGameData = () => {
  const [gameList, setGameList] = useRecoilState(gameListAtom);
  const [game, setGame] = useState<Game | null>(null);
  const [error, setError] = useState<string>('');
  const errorEmpty = 'error:empty data';
  const errException = 'error: an unexpected error occurred';

  const fetchGameListData = async (lid: string, signal?: AbortSignal) => {
    try {
      setGameList(null);
      const res = await fetchGameList(lid, signal);
      if (res) {
        setGameList(res);
      } else {
        throw new Error(errorEmpty);
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.message) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(errException);
      }
    }
  };

  const fetchGameData = async (id: string, lid: string, signal?: AbortSignal) => {
    try {
      const res = await fetchGame(id, lid, signal);
      if (res) {
        setGame(res);
      } else {
        throw new Error(errorEmpty);
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.message) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(errException);
      }
    }
  };

  const createGameData = async (game: ReqCreateGame) => {
    try {
      const res = await createGame(game);
      if (res) {
        setGameList((prev) => (prev ? [...prev, res] : [res]));
      } else {
        throw new Error(errorEmpty);
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.message) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(errException);
      }
    }
  };

  const updateGameData = async (game: Game) => {
    try {
      const res = await updateGame(game);
      if (res) {
        setGameList((prev) =>
          prev ? prev.map((game) => (game.id === res.id ? res : game)) : [res]
        );
      } else {
        throw new Error(errorEmpty);
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.message) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(errException);
      }
    }
  };

  const deleteGameData = async (id: string, lid: string) => {
    try {
      const res = await deleteGame(id, lid);
      if (res) {
        setGameList((prev) => (prev ? prev.filter((game) => game.id !== res.id) : []));
      } else {
        throw new Error(errorEmpty);
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.message) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(errException);
      }
    }
  };

  return {
    gameList,
    game,
    error,
    fetchGameListData,
    fetchGameData,
    createGameData,
    updateGameData,
    deleteGameData,
  };
};

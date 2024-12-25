import axios from 'axios';
import { Game, ReqCreateGame } from '../../../types/game';
import { useState } from 'react';
import { createGame, deleteGame, updateGame } from '../../../api/services/gameService';
import { useAtom } from 'jotai';
import { gameListFetcher } from '../jotai/gameListFetcher';

export const useGameData = () => {
  const [gameList, refreshGameList] = useAtom(gameListFetcher);
  const [error, setError] = useState<string>('');
  const errorEmpty = 'error:empty data';
  const errException = 'error: an unexpected error occurred';

  const createGameData = async (game: ReqCreateGame) => {
    try {
      const res = await createGame(game);
      if (res) {
        refreshGameList();
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
        refreshGameList();
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
        refreshGameList();
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
    error,
    createGameData,
    updateGameData,
    deleteGameData,
  };
};

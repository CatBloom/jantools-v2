import axios from 'axios';
import { Game, ReqCreateGame } from '../../../types/game';
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import { createGame, deleteGame, updateGame } from '../../../api/services/gameService';
import { gameListAtom } from '../recoil/atoms/gameListAtom';

export const useGameData = () => {
  const [gameList, setGameList] = useRecoilState(gameListAtom);
  const [error, setError] = useState<string>('');
  const errorEmpty = 'error:empty data';
  const errException = 'error: an unexpected error occurred';

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
    error,
    createGameData,
    updateGameData,
    deleteGameData,
  };
};

import axios from 'axios';
import { Game, ReqCreateGame } from '../../../types/game';
import { useState } from 'react';
import { createGame, deleteGame, updateGame } from '../../../api/services/gameService';
import { useAtom, useAtomValue } from 'jotai';
import { gameLineChartAtom } from '../jotai/gameLineChartAtom';
import { gamePieChartAtom } from '../jotai/gamePieChartAtom';
import { gamePlayerAtom } from '../jotai/gamePlayerAtom';
import { gameResultTotalAtom } from '../jotai/gameResultTotalAtom';
import { gameResultDescAtom } from '../jotai/gameResultDescAtom';
import { gameListFetcher } from '../jotai/gameListFetcher';

export const useGameData = () => {
  const [gameListData, refreshGameListData] = useAtom(gameListFetcher);
  const resultDescData = useAtomValue(gameResultDescAtom);
  const lineChartData = useAtomValue(gameLineChartAtom);
  const pieChartData = useAtomValue(gamePieChartAtom);
  const playersData = useAtomValue(gamePlayerAtom);
  const resultTotalData = useAtomValue(gameResultTotalAtom);

  const [error, setError] = useState<string>('');
  const errorEmpty = 'error:empty data';
  const errException = 'error: an unexpected error occurred';

  const createGameData = async (game: ReqCreateGame) => {
    try {
      const res = await createGame(game);
      if (res) {
        refreshGameListData();
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
        refreshGameListData();
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
        refreshGameListData();
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
    gameListData,
    error,
    createGameData,
    updateGameData,
    deleteGameData,
    resultDescData,
    lineChartData,
    pieChartData,
    playersData,
    resultTotalData,
  };
};

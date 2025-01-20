import axios from 'axios';
import { useState } from 'react';
import { ReqCreateGame } from '../../../types/game';
import { createGame, deleteGame } from '../api/gameService';
import { useAtomValue, useSetAtom } from 'jotai';
import { gameListFetcher } from '../jotai/gameListFetcher';
import { GameFormData } from '../types/form';
import { useLoading } from '../../../hooks/useLoading';
import { readonlyParamWithIDAtom } from '../../../state/paramsState';

export const useGame = () => {
  const refreshGameListData = useSetAtom(gameListFetcher);
  const paramID = useAtomValue(readonlyParamWithIDAtom);
  const loading = useLoading();

  const [error, setError] = useState<string>('');
  const errorEmpty = 'error:empty data';
  const errException = 'error: an unexpected error occurred';

  const create = async (formdata: GameFormData) => {
    if (!paramID) return;
    const req: ReqCreateGame = { ...formdata, leagueID: paramID };
    try {
      loading.start();
      const res = await createGame(req);
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
    } finally {
      loading.finish();
    }
  };

  const remove = async (gid: string) => {
    if (!paramID) return;
    try {
      loading.start();
      const res = await deleteGame(gid, paramID);
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
    } finally {
      loading.finish();
    }
  };

  return {
    create,
    remove,
    error,
  };
};

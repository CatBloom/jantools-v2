import { useAtomValue, useSetAtom } from 'jotai';
import { GameFormData, ReqCreateGame } from '@/types/game';
import { useLoading } from '@/hooks/useLoading';
import { useNotice } from '@/hooks/useNotice';
import { readonlyParamWithIDAtom } from '@/state/paramsState';
import { gameListFetcher } from '../api/gameListFetcher';
import { createGame, deleteGame } from '../api/gameService';

export const useGame = () => {
  const refreshGameListData = useSetAtom(gameListFetcher);
  const paramID = useAtomValue(readonlyParamWithIDAtom);
  const loading = useLoading();
  const { set } = useNotice();
  const errorEmpty = 'error:empty data';

  const create = async (formdata: GameFormData) => {
    if (!paramID) return;
    const req: ReqCreateGame = { ...formdata, leagueID: paramID };
    try {
      loading.start();
      const res = await createGame(req);
      if (res) {
        refreshGameListData();
        set({ message: '登録が完了しました。', severity: 'success' });
      } else {
        throw new Error(errorEmpty);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
      set({ severity: 'error' });
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
        set({ message: '削除が完了しました。', severity: 'success' });
      } else {
        throw new Error(errorEmpty);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
        set({ severity: 'error' });
      } else {
        set({ severity: 'error' });
      }
    } finally {
      loading.finish();
    }
  };

  return {
    create,
    remove,
  };
};

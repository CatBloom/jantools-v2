import { useAtomValue, useSetAtom } from 'jotai';
import { GameFormData } from '@/types/game';
import { useLoading } from '@/hooks/useLoading';
import { useNotice } from '@/hooks/useNotice';
import { readonlyParamWithIDAtom } from '@/state/paramsState';
import { readonlyTokensAtom } from '@/state/tokenState';
import { gameListFetcher } from '../api/gameListFetcher';
import { createGame, deleteGame } from '../api/gameService';

export const useGame = () => {
  const refreshGameListData = useSetAtom(gameListFetcher);
  const paramID = useAtomValue(readonlyParamWithIDAtom);
  const tokens = useAtomValue(readonlyTokensAtom);
  const loading = useLoading();
  const { set } = useNotice();
  const errorEmpty = 'error:empty data';

  const create = async (data: GameFormData) => {
    if (!paramID) return;
    try {
      loading.start();
      const token = tokens[paramID];
      if (!token) {
        set({
          message: '編集権限がありません。再度編集権限をリクエストしてください。',
          severity: 'error',
        });
        return;
      }

      const res = await createGame(data, token);
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
      const token = tokens[paramID];
      if (!token) {
        set({
          message: '編集権限が無効です。再度編集権限をリクエストしてください。',
          severity: 'error',
        });
        return;
      }

      const res = await deleteGame(gid, token);
      if (res) {
        refreshGameListData();
        set({ message: '削除が完了しました。', severity: 'success' });
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

  return { create, remove };
};

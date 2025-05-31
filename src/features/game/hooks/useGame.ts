import { useAtomValue, useSetAtom } from 'jotai';
import { Game, GameFormData } from '@/types/game';
import { useLoading } from '@/hooks/useLoading';
import { useNotice } from '@/hooks/useNotice';
import { useToken } from '@/hooks/useToken';
import { readonlyParamWithIDAtom } from '@/state/params';
import { gameListFetcher } from '../api/gameListFetcher';
import { createGame, deleteGame, updateGame } from '../api/gameService';

export const useGame = () => {
  const refreshGameListData = useSetAtom(gameListFetcher);
  const paramID = useAtomValue(readonlyParamWithIDAtom);
  const loading = useLoading();
  const token = useToken();
  const { set } = useNotice();
  const errorEmpty = 'error:empty data';

  const create = async (formData: GameFormData) => {
    if (!paramID) return;
    try {
      loading.start();
      const currToken = token.search(paramID);
      if (!currToken) {
        set({
          message: '編集権限がありません。再度編集権限をリクエストしてください。',
          severity: 'error',
        });
        return;
      }

      const res = await createGame(formData, currToken);
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

  const update = async (prevGameData: Game, formData: GameFormData) => {
    if (!paramID) return;
    const req: Game = {
      id: prevGameData.id,
      leagueID: prevGameData.leagueID,
      createdAt: prevGameData.createdAt,
      ...formData,
    };
    try {
      loading.start();
      const currToken = token.search(paramID);
      if (!currToken) {
        set({
          message: '編集権限がありません。再度編集権限をリクエストしてください。',
          severity: 'error',
        });
        return;
      }

      const res = await updateGame(req, currToken);
      if (res) {
        refreshGameListData();
        set({ message: '編集が完了しました。', severity: 'success' });
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
      const currToken = token.search(paramID);
      if (!token) {
        set({
          message: '編集権限が無効です。再度編集権限をリクエストしてください。',
          severity: 'error',
        });
        return;
      }

      const res = await deleteGame(gid, currToken);
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

  return { create, update, remove };
};

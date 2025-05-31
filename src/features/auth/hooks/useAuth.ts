import { useCallback, useEffect } from 'react';
import { atom, useAtom, useAtomValue } from 'jotai';
import { createToken } from '../api/authService';
import { readonlyParamWithIDAtom } from '@/state/params';
import { useLoading } from '@/hooks/useLoading';
import { useNotice } from '@/hooks/useNotice';
import { useToken } from '@/hooks/useToken';
import { parseJwt } from '@/utils/jwt';

const isAuthAtom = atom(false);

export const useAuth = () => {
  const [isAuth, setIsAuth] = useAtom(isAuthAtom);
  const paramID = useAtomValue(readonlyParamWithIDAtom);
  const loading = useLoading();
  const token = useToken();
  const { set } = useNotice();

  const create = async (password: string) => {
    if (!paramID) return;

    if (password === '') {
      set({ message: 'パスワードが入力されていません', severity: 'warning' });
      return;
    }

    try {
      loading.start();
      const res = await createToken(paramID, password);
      token.set(paramID, res.token);
      set({ message: '編集権限を取得しました。', severity: 'success' });
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
      set({ message: 'パスワードが間違っています。', severity: 'error' });
    } finally {
      loading.finish();
    }
  };

  const verifyByID = useCallback(
    (id?: string): void => {
      if (!id) {
        setIsAuth(false);
        return;
      }
      const jwt = token.search(id);
      if (!jwt) {
        setIsAuth(false);
        return;
      }

      const payload = parseJwt(jwt);
      if (!payload || !payload.exp) {
        setIsAuth(false);
        return;
      }

      // 有効期限を確認
      const now = Math.floor(Date.now() / 1000);
      const isExpired = payload.exp < now;
      if (isExpired) {
        set({
          message: '認証期限切れです。再度、編集権限をリクエストしてください。',
          severity: 'warning',
        });
        // 有効期限切れでlocalstorageから削除
        token.remove(id);
        setIsAuth(false);
        return;
      }
      setIsAuth(payload.sub === id);
    },
    [token, setIsAuth, set]
  );

  // paramIDが変更されるたびに、認証済みか確認する
  useEffect(() => {
    verifyByID(paramID);
  }, [paramID, verifyByID]);

  return { create, verifyByID, isAuth };
};

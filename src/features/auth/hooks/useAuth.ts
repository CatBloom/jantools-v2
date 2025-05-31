import { useCallback, useEffect } from 'react';
import { atom, useAtom, useAtomValue } from 'jotai';
import { createToken } from '../api/authService';
import { readonlyParamWithIDAtom } from '@/state/params';
import { tokensAtom } from '@/state/token';
import { useLoading } from '@/hooks/useLoading';
import { useNotice } from '@/hooks/useNotice';
import { parseJwt } from '@/utils/jwt';

const isAuthAtom = atom(false);

export const useAuth = () => {
  const [tokens, setTokens] = useAtom(tokensAtom);
  const [isAuth, setIsAuth] = useAtom(isAuthAtom);
  const paramID = useAtomValue(readonlyParamWithIDAtom);
  const loading = useLoading();
  const { set } = useNotice();

  const create = async (password: string) => {
    if (!paramID) return;

    if (password === '') {
      set({ message: 'パスワードが入力されていません', severity: 'warning' });
      return;
    }

    try {
      loading.start();
      const token = await createToken(paramID, password);
      setTokens((prev) => ({
        ...prev,
        [paramID]: token.token,
      }));
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
      const jwt = tokens[id];
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
        setTokens((prev) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [id]: _, ...rest } = prev;
          return rest;
        });
        setIsAuth(false);
        return;
      }
      setIsAuth(payload.sub === id);
    },
    [tokens, setIsAuth, set, setTokens]
  );

  // paramIDが変更されるたびに、認証済みか確認する
  useEffect(() => {
    verifyByID(paramID);
  }, [paramID, verifyByID]);

  return { create, verifyByID, isAuth };
};

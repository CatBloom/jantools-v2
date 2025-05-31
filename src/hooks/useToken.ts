import { useAtom } from 'jotai';
import { TokenStorage } from '@/types/common';
import { atomWithStorage } from 'jotai/utils';
import { useCallback } from 'react';

export const tokensAtom = atomWithStorage<TokenStorage>('auth', {});

export const useToken = () => {
  const [tokens, setTokens] = useAtom(tokensAtom);

  const search = useCallback(
    (id: string) => {
      return tokens[id];
    },
    [tokens]
  );

  const set = useCallback(
    (id: string, token: string) => {
      setTokens((prev) => ({
        ...prev,
        [id]: token,
      }));
    },
    [setTokens]
  );

  const remove = useCallback(
    (id: string) => {
      setTokens((prev) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [id]: _, ...rest } = prev;
        return rest;
      });
    },
    [setTokens]
  );

  return { search, set, remove };
};

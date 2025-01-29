import { useCallback } from 'react';
import { atom, useAtom } from 'jotai';

const loadingAtom = atom(false);

export const useLoading = () => {
  const [isLoading, setLoading] = useAtom(loadingAtom);

  const start = useCallback(() => setLoading(true), [setLoading]);
  const finish = useCallback(() => setLoading(false), [setLoading]);

  return { isLoading, start, finish };
};

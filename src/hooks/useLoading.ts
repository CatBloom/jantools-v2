import { useCallback } from 'react';
import { loadingAtom } from '../jotai';
import { useAtom } from 'jotai';

export const useLoading = () => {
  const [isLoading, setLoading] = useAtom(loadingAtom);

  const start = useCallback(() => setLoading(true), [setLoading]);
  const finish = useCallback(() => setLoading(false), [setLoading]);

  return { isLoading, start, finish };
};

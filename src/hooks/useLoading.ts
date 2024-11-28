import { useCallback } from 'react';
import { useAtom } from 'jotai';
import { loadingAtom } from '../jotai/loadingAtom';

export const useLoading = () => {
  const [isLoading, setLoading] = useAtom(loadingAtom);

  const start = useCallback(() => setLoading(true), [setLoading]);
  const finish = useCallback(() => setLoading(false), [setLoading]);

  return { isLoading, start, finish };
};

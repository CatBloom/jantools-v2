import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { loadingAtom } from '../recoil/atoms';

export const useLoading = () => {
  const [isLoading, setLoading] = useRecoilState(loadingAtom);

  const start = useCallback(() => setLoading(true), [setLoading]);
  const finish = useCallback(() => setLoading(false), [setLoading]);

  return { isLoading, start, finish };
};

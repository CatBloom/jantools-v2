import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { loadingAtom } from '../recoil/atoms';

export const useLoading = () => {
  const [isLoading, setIsOpen] = useRecoilState(loadingAtom);

  const start = useCallback(() => setIsOpen(true), []);
  const finish = useCallback(() => setIsOpen(false), []);

  return { isLoading, start, finish };
};

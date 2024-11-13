import { useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { gameListFetcher, gameListAtom } from '../jotai';

export const useSyncGameListData = () => {
  const setGameList = useSetAtom(gameListAtom);
  const [featchGameList] = useAtom(gameListFetcher);

  useEffect(() => {
    if (featchGameList) {
      setGameList(featchGameList);
    }
  }, [featchGameList, setGameList]);
};

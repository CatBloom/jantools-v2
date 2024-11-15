import { useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { gameListFetcher, gameListAtom } from '../jotai';
import { paramWithIDAtom, prevParamWithIDAtom } from '../../../jotai/paramsAtom';

export const useSyncGameListData = () => {
  const setGameList = useSetAtom(gameListAtom);
  const [fetchGameList] = useAtom(gameListFetcher);
  const [currID] = useAtom(paramWithIDAtom);
  const [prevID] = useAtom(prevParamWithIDAtom);

  useEffect(() => {
    if (!currID) return;
    if (currID !== prevID) {
      setGameList(fetchGameList);
    }
  }, [currID, prevID, fetchGameList, setGameList]);
};

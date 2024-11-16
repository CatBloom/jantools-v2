import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { gameListFetcher, gameListAtom } from '../jotai';
import { paramWithIDAtom, prevParamWithIDAtom } from '../../../jotai/paramsAtom';

export const useSyncGameListData = () => {
  const setGameList = useSetAtom(gameListAtom);
  const fetchGameList = useAtomValue(gameListFetcher);
  const currID = useAtomValue(paramWithIDAtom);
  const prevID = useAtomValue(prevParamWithIDAtom);

  useEffect(() => {
    if (!currID) return;
    if (currID !== prevID) {
      setGameList(fetchGameList);
    }
  }, [currID, prevID, fetchGameList, setGameList]);
};

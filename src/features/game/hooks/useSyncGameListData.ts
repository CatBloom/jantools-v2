import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { gameListAtom } from '../jotai/gameListAtom';
import { gameListFetcher } from '../jotai/gameListFetcher';
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

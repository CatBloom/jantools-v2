import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { gameListAtom } from '../recoil/atoms/gameListAtom';
import { gameListSelector } from '../recoil/selectors';

export const useSyncGameListData = (lid?: string) => {
  const setGameList = useSetRecoilState(gameListAtom);
  const gameData = useRecoilValue(gameListSelector(lid));

  useEffect(() => {
    if (gameData) {
      setGameList(gameData);
    }
  }, [gameData, setGameList]);
};

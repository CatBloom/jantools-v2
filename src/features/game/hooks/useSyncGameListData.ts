import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { gameListAtom } from '../recoil/atoms/gameListAtom';
import { gameListSelector } from '../recoil/selectors/gameSelector';

export const useSyncGameListData = (lid?: string) => {
  const [gameList, setGameList] = useRecoilState(gameListAtom);
  const gameData = useRecoilValue(gameListSelector(lid));

  useEffect(() => {
    if (gameData && gameData !== gameList) {
      setGameList(gameData);
    }
  }, [gameList, gameData, setGameList]);

  return { gameList, setGameList };
};

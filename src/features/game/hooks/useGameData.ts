import { useAtomValue } from 'jotai';
import { gameLineChartAtom } from '../jotai/gameLineChartAtom';
import { gamePieChartAtom } from '../jotai/gamePieChartAtom';
import { gamePlayerAtom } from '../jotai/gamePlayerAtom';
import { gameResultTotalAtom } from '../jotai/gameResultTotalAtom';
import { gameResultDescAtom } from '../jotai/gameResultDescAtom';
import { gameListFetcher } from '../jotai/gameListFetcher';

export const useGameData = () => {
  const gameListData = useAtomValue(gameListFetcher);
  const resultDescData = useAtomValue(gameResultDescAtom);
  const lineChartData = useAtomValue(gameLineChartAtom);
  const pieChartData = useAtomValue(gamePieChartAtom);
  const playersData = useAtomValue(gamePlayerAtom);
  const resultTotalData = useAtomValue(gameResultTotalAtom);

  return {
    gameListData,
    resultDescData,
    lineChartData,
    pieChartData,
    playersData,
    resultTotalData,
  };
};

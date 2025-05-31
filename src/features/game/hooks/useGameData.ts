import { useAtomValue } from 'jotai';
import { gameLineChartAtom } from '../jotai/gameLineChartAtom';
import { gamePieChartAtom } from '../jotai/gamePieChartAtom';
import { gamePlayerAtom } from '../jotai/gamePlayerAtom';
import { gameResultTotalAtom } from '../jotai/gameResultTotalAtom';
import { gameResultDescAtom } from '../jotai/gameResultDescAtom';
import { gameListFetcher } from '../api/gameListFetcher';
import { useEditMode } from '@/hooks/useEditMode';
import { useEffect } from 'react';

export const useGameData = () => {
  const gameListData = useAtomValue(gameListFetcher);
  const resultDescData = useAtomValue(gameResultDescAtom);
  const lineChartData = useAtomValue(gameLineChartAtom);
  const pieChartData = useAtomValue(gamePieChartAtom);
  const playersData = useAtomValue(gamePlayerAtom);
  const resultTotalData = useAtomValue(gameResultTotalAtom);

  const gameEdit = useEditMode();
  // ゲームデータが存在するか確認用
  const hasGameListData = !!(gameListData && gameListData.length > 0);

  // 編集モード中にゲームが空になった時、編集モード中を解除する
  useEffect(() => {
    if (!hasGameListData && gameEdit.isEdit) {
      gameEdit.setIsEdit(false);
    }
  }, [hasGameListData, gameEdit.setIsEdit, gameEdit]);

  return {
    gameListData,
    resultDescData,
    lineChartData,
    pieChartData,
    playersData,
    resultTotalData,
    hasGameListData,
    gameEdit,
  };
};

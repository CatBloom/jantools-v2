import { atom } from 'jotai';
import { GameResultTotal } from '../../../types/game';
import { gameListAtom } from './gameListAtom';

export const gameResultTotalAtom = atom<GameResultTotal[] | null>((get) => {
  const gameResults = get(gameListAtom);
  if (!gameResults) return null;

  const nameMap: { [name: string]: GameResultTotal & { sumRank: number } } = {};
  gameResults.forEach((game) => {
    game.results.forEach((result) => {
      const { name, calcPoint, rank } = result;
      if (!nameMap[name]) {
        nameMap[name] = {
          name,
          totalPoint: 0,
          gameCount: 0,
          rank: 0,
          averageRank: 0,
          sumRank: 0,
        };
      }
      nameMap[name].totalPoint += calcPoint;
      nameMap[name].gameCount += 1;
      nameMap[name].sumRank += rank;
    });
  });

  Object.values(nameMap).forEach((name) => {
    // 合計得点を整形(少数第1位まで)
    name.totalPoint = Math.floor(name.totalPoint * 10) / 10;
    // 平均着順を作成(少数点第2位まで)
    name.averageRank = Math.floor((name.sumRank / name.gameCount) * 100) / 100;
  });

  // ポイントの高い順、平均着順の低い順にソート
  const sortedResults = Object.values(nameMap).sort((a, b) => {
    if (b.totalPoint !== a.totalPoint) {
      return b.totalPoint - a.totalPoint;
    } else {
      return a.averageRank - b.averageRank;
    }
  });

  // ソートした配列に順位を追加
  sortedResults.forEach((name, i) => {
    name.rank = i + 1; // 1位から順にrankを設定
  });

  return sortedResults;
});

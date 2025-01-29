import { atom } from 'jotai';
import { gameListFetcher } from '../api/gameListFetcher';

interface GamePieData {
  id: number;
  label: string;
  value: number;
  color: string;
}

export const gamePieChartAtom = atom(async (get) => {
  const gameList = await get(gameListFetcher);
  if (!gameList) return [];

  const names = Array.from(
    new Set(gameList.flatMap((game) => game.results.map((result) => result.name)))
  );

  return names.map((name) => {
    const resultsByName = gameList
      .flatMap((game) => game.results)
      .filter((result) => result.name === name);

    const rankCountArray: { rank: number; count: number }[] = [];
    resultsByName.forEach((result) => {
      const existingRank = rankCountArray.find((entry) => entry.rank === result.rank);
      if (existingRank) {
        existingRank.count += 1;
      } else {
        rankCountArray.push({ rank: result.rank, count: 1 });
      }
    });

    // トータル対戦数を取得
    const total = resultsByName.length;
    // 順位に対応する円グラフの色を格納
    // 順位は常に1〜4の範囲であるため、配列の長さは4に固定
    const colors = ['#C96868', '#DEAA79', '#B1C29E', '#7EACB5'];
    const pieData: GamePieData[] = rankCountArray.map((entry) => ({
      id: entry.rank,
      label: entry.rank.toString() + '位',
      value: Math.floor((entry.count / total) * 1000) / 10, // 少数点第2位まで
      color: colors[entry.rank - 1],
    }));

    return { name: name, results: pieData.sort((a, b) => a.id - b.id) };
  });
});

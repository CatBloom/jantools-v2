import { atom } from 'jotai';
import { gameListAtom } from './gameListAtom';

interface GamePieData {
  id: number;
  label: string;
  value: number;
}

export const gamePieChartAtom = atom((get) => {
  const gameList = get(gameListAtom);
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
    const pieData: GamePieData[] = rankCountArray.map((entry) => ({
      id: entry.rank,
      label: entry.rank.toString() + '位',
      value: Math.floor((entry.count / total) * 1000) / 10, // 少数点第2位まで
    }));

    return { name: name, results: pieData.sort((a, b) => a.id - b.id) };
  });
});

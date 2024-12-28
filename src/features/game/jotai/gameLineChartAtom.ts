import { atom } from 'jotai';
import { dateFormat } from '../../../utils/date';
import { gameListFetcher } from './gameListFetcher';

interface GameLineData {
  rank: number | null;
  createdAt: string;
}

export const gameLineChartAtom = atom(async (get) => {
  const gameList = await get(gameListFetcher);
  if (!gameList) return [];

  const names = Array.from(
    new Set(gameList.flatMap((game) => game.results.map((result) => result.name)))
  );

  // 表示は最新から10件に限定する
  const displayCount = 10;
  return names.map((name) => {
    const results: GameLineData[] = gameList
      .filter((game) => game.results.some((result) => result.name === name))
      .map((game) => {
        const result = game.results.find((r) => r.name === name);
        if (result) {
          return {
            rank: result.rank,
            createdAt: dateFormat(game.createdAt),
          };
        }
      })
      .filter((item) => !!item)
      .sort((a, b) => {
        return b.createdAt.localeCompare(a.createdAt);
      })
      .slice(0, displayCount)
      .reverse();

    // 10件のデータがない場合は、ダミーデータを追加
    while (results.length < displayCount) {
      results.push({ rank: null, createdAt: results.length.toString() });
    }
    return { name: name, results: results };
  });
});

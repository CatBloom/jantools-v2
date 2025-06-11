import { atom } from 'jotai';
import { dateFormat } from '@/utils/date';
import { gameListFetcher } from '../api/gameListFetcher';

interface GameLineData {
  rank: number | null;
  gameDate: string;
  createdAt: string;
  sortKey: string;
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
            gameDate: dateFormat(game.gameDate),
            createdAt: game.createdAt,
            sortKey: '',
          };
        }
      })
      .filter((item) => !!item)
      .sort((a, b) => {
        // 試合日は、重複する可能性があるため
        // 重複した場合は、作成日でソートする
        const dateCompare = b.gameDate.localeCompare(a.gameDate);
        if (dateCompare !== 0) {
          return dateCompare;
        }
        return b.createdAt.localeCompare(a.createdAt);
      })
      .slice(0, displayCount)
      .reverse();

    // 10件のデータがない場合は、ダミーデータを追加
    while (results.length < displayCount) {
      results.push({
        rank: null,
        gameDate: results.length.toString(),
        createdAt: '',
        sortKey: '',
      });
    }

    // gameDateが同じ場合、ソートができないため
    // createdAtをもとに、sortKeyを作成して対応
    const seenDates = new Map<string, number>();
    const resultsWithSortKey = results.map((item) => {
      const count = seenDates.get(item.gameDate) || 0;
      seenDates.set(item.gameDate, count + 1);
      const sortKey = count === 0 ? item.gameDate : `${item.gameDate}_${count}`;
      return {
        ...item,
        sortKey,
      };
    });
    return { name: name, results: resultsWithSortKey };
  });
});

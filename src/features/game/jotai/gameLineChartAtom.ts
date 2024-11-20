import { atom } from 'jotai';
import { gameListAtom } from './gameListAtom';
import { dateFormat } from '../../../utils/date';

export const gameLineChartAtom = (name?: string) =>
  atom((get) => {
    const gameList = get(gameListAtom);
    if (!gameList || !name) return [];

    const filteredResults = gameList.filter((game) =>
      game.results.some((result) => result.name === name)
    );

    const sortedResults = filteredResults.sort((a, b) => {
      return b.createdAt.localeCompare(a.createdAt);
    });

    const results = sortedResults
      .map((game) => {
        const result = game.results.find((r) => r.name === name);
        if (result) {
          return {
            rank: result.rank,
            createAt: dateFormat(game.createdAt),
          };
        }
      })
      .filter((item): item is { rank: number; createAt: string } => !!item);

    return results.slice(0, 10);
  });

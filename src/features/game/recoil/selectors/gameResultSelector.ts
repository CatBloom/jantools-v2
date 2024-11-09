import { selector } from 'recoil';
import { gameListAtom } from '../atoms/gameListAtom';
import { Game } from '../../../../types/game';

export const gameResultSelector = (name?: string) =>
  selector<Game[] | null>({
    key: `gameResultSelector${name ? '_' + name : ''}`,
    get: ({ get }) => {
      const gameResults = get(gameListAtom);
      if (!gameResults) {
        return null;
      }

      const filteredResults = name
        ? gameResults.filter((game) => game.results.some((result) => result.name === name))
        : gameResults;

      const sortedResults = [...filteredResults].sort((a, b) => {
        return b.createdAt.localeCompare(a.createdAt);
      });

      return sortedResults;
    },
  });

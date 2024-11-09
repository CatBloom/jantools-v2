import { selectorFamily } from 'recoil';
import { gameListAtom } from '../atoms/gameListAtom';
import { Game } from '../../../../types/game';

export const gameResultSelector = selectorFamily<Game[] | null, string | undefined>({
  key: 'gameResultSelector',
  get:
    (name) =>
    ({ get }) => {
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

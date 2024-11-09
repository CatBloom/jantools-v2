import { selector } from 'recoil';
import { gameListAtom } from '../atoms/gameListAtom';

export const gamePlayerSelector = selector<string[]>({
  key: 'gamePlayerSelector',
  get: ({ get }) => {
    const gameList = get(gameListAtom);
    if (!gameList) {
      return [];
    }

    const playerSet = new Set<string>();
    gameList.forEach((game) => {
      game.results.forEach((result) => {
        playerSet.add(result.name);
      });
    });

    return Array.from(playerSet);
  },
});

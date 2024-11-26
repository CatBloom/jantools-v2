import { atom } from 'jotai';
import { gameListAtom } from './gameListAtom';

export const gamePlayerAtom = atom((get) => {
  const gameList = get(gameListAtom);
  if (!gameList) return [];

  const playerSet = new Set<string>();
  gameList.forEach((game) => {
    game.results.forEach((result) => {
      playerSet.add(result.name);
    });
  });

  return Array.from(playerSet);
});

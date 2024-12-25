import { atom } from 'jotai';
import { gameListFetcher } from './gameListFetcher';

export const gamePlayerAtom = atom(async (get) => {
  const gameList = await get(gameListFetcher);
  if (!gameList) return [];

  const playerSet = new Set<string>();
  gameList.forEach((game) => {
    game.results.forEach((result) => {
      playerSet.add(result.name);
    });
  });

  return Array.from(playerSet);
});

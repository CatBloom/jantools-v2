import { atom } from 'jotai';
import { gameListFetcher } from './gameListFetcher';

export const gameResultsAtom = atom(async (get) => {
  const gameList = await get(gameListFetcher);
  if (!gameList) return [];

  return [...gameList].sort((a, b) => {
    return b.createdAt.localeCompare(a.createdAt);
  });
});

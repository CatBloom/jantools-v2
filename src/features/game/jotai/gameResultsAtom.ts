import { atom } from 'jotai';
import { Game } from '../../../types/game';
import { gameListAtom } from './gameListAtom';

export const gameResultsAtom = atom<Game[]>((get) => {
  const gameList = get(gameListAtom);
  if (!gameList) return [];

  return [...gameList].sort((a, b) => {
    return b.createdAt.localeCompare(a.createdAt);
  });
});

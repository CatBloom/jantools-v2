import { atom } from 'jotai';
import { Game } from '../../../types/game';
import { gameListAtom } from './gameListAtom';

export const gameResultsAtom = (name?: string) =>
  atom<Game[] | null>((get) => {
    const gameResults = get(gameListAtom);
    if (!gameResults) return null;

    const filteredResults = name
      ? gameResults.filter((game) => game.results.some((result) => result.name === name))
      : gameResults;

    const sortedResults = [...filteredResults].sort((a, b) => {
      return b.createdAt.localeCompare(a.createdAt);
    });

    return sortedResults;
  });

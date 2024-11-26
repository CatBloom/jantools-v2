import { atom } from 'jotai';
import { Game } from '../../../types/game';

export const gameListAtom = atom<Game[] | null>(null);

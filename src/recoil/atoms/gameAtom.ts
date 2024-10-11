import { atom } from 'recoil';
import { Game } from '../../types/game';

export const gameListAtom = atom<Game[] | null>({
  key: 'gameListState',
  default: null,
});

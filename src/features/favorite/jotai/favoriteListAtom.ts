import { atomWithStorage } from 'jotai/utils';

interface Favorite {
  id: string;
  name: string;
}

export const favoriteListAtom = atomWithStorage<Favorite[]>('favoriteList', []);

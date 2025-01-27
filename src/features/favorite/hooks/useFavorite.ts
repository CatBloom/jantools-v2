import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { Favorite } from '../types/Favorite';

const favoriteListAtom = atomWithStorage<Favorite[]>('favoriteList', []);

export const useFavorite = () => {
  const [favoriteList, setFavoriteList] = useAtom(favoriteListAtom);

  const addFavorite = (id: string, name: string) => {
    setFavoriteList((prev) => [...prev, { id: id, name: name }]);
  };

  const removeFavorite = (id: string) => {
    setFavoriteList((prev) => prev.filter((favorite) => favorite.id !== id));
  };

  return { favoriteList, addFavorite, removeFavorite };
};

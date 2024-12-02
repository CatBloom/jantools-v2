import { useAtom } from 'jotai';
import { favoriteListAtom } from '../jotai/favoriteListAtom';
import { Favorite } from '../types/Favorite';

export const useFavorite = () => {
  const [favoriteList, setFavoriteList] = useAtom(favoriteListAtom);

  const addFavorite = (favorite: Favorite) => {
    setFavoriteList((prev) => [...prev, { id: favorite.id, name: favorite.name }]);
  };

  const removeFavorite = (id: string) => {
    setFavoriteList((prev) => prev.filter((favorite) => favorite.id !== id));
  };

  return { favoriteList, addFavorite, removeFavorite };
};

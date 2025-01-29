import { IconButton } from '@mui/material';
import { IconSecondaryStar, IconStar } from '@/components/icons/IconSrar';
import { Favorite } from '@/types/favorite';
import { useFavorite } from './hooks/useFavorite';

export const FavoriteToggle = (props: { favorite: Favorite }) => {
  const { favorite } = props;
  const { favoriteList, addFavorite, removeFavorite } = useFavorite();

  const isFavorite = favoriteList.some((item) => item.id === favorite.id);

  return (
    <IconButton
      onClick={() => {
        if (isFavorite) {
          removeFavorite(favorite.id);
        } else {
          addFavorite(favorite.id, favorite.name);
        }
      }}
    >
      {isFavorite ? <IconSecondaryStar /> : <IconStar />}
    </IconButton>
  );
};

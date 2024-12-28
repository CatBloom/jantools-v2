import { Button, Menu, MenuItem, Typography } from '@mui/material';
import { useFavorite } from './hooks/useFavorite';
import { IconStar } from '../../components/icons/IconSrar';
import { useMenu } from '../../hooks/useMenu';
import { useTheme } from '../../hooks/useTheme';
import { Link } from 'react-router';
import { IconArrowDown } from '../../components/icons/IconArrow';

export const FavoriteMenu = () => {
  const { favoriteList } = useFavorite();
  const { theme } = useTheme();
  const { isOpen, anchorEl, openMenu, closeMenu } = useMenu();

  if (!favoriteList.length) return null;

  return (
    <>
      <Button sx={{ color: '#FFFFFF' }} onClick={openMenu}>
        <IconStar />
        <IconArrowDown />
      </Button>
      <Menu anchorEl={anchorEl} open={isOpen} onClose={closeMenu} sx={{ width: 150 }}>
        {favoriteList.map((v) => (
          <MenuItem onClick={closeMenu} key={v.id}>
            <Typography variant="inherit" noWrap>
              <Link
                to={`/detail/${v.id}`}
                style={{
                  textDecoration: 'none',
                  color: theme.palette.text.primary,
                }}
              >
                {v.name}
              </Link>
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
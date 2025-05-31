import { Link } from 'react-router';
import { Button, Menu, MenuItem, Typography } from '@mui/material';
import { IconStar } from '@/components/icons/IconSrar';
import { IconArrowDown } from '@/components/icons/IconArrow';
import { useMenu } from '@/hooks/useMenu';
import { useTheme } from '@/hooks/useTheme';
import { useFavorite } from '../hooks/useFavorite';

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
          <MenuItem
            key={v.id}
            component={Link}
            to={`/detail/${v.id}`}
            onClick={closeMenu}
            sx={{ textDecoration: 'none', color: theme.palette.text.primary }}
          >
            <Typography variant="inherit" noWrap>
              {v.name}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

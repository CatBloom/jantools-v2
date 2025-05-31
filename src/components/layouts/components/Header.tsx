import { AppBar, Box, Stack, Toolbar } from '@mui/material';
import { Link } from 'react-router';
import logo from '@/assets/titlelogo.png';
import { useTheme } from '@/hooks/useTheme';
import { FavoriteMenu } from '@/features/favorite/components/FavoriteMenu';
import { ThemeSwitch } from '@/components/ThemeSwitch';

export const Header = () => {
  const { currentTheme, switchTheme } = useTheme();

  return (
    <AppBar position="static" sx={{ flexGrow: 1 }}>
      <Toolbar variant="dense">
        <Link to="/">
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              mt: 0.3,
              height: 40,
            }}
          ></Box>
        </Link>
        <Stack direction="row" sx={{ ml: 'auto' }}>
          <FavoriteMenu />
          <ThemeSwitch checked={currentTheme === 'dark'} onChange={switchTheme} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

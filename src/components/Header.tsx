import { AppBar, Box, Toolbar } from '@mui/material';
import { ThemeSwitch } from '../components/ThemeSwitch';
import { Link } from 'react-router';
import logo from '../assets/titlelogo.png';
import { useTheme } from '../hooks/useTheme';

export const Header = () => {
  const { theme, switchTheme } = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
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
          <ThemeSwitch
            sx={{ m: 1, ml: 'auto' }}
            checked={theme === 'dark'}
            onChange={switchTheme}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

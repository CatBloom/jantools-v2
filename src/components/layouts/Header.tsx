import { AppBar, Box, Toolbar, useColorScheme } from '@mui/material';
import { MUIThemeSwitch } from '../buttons/MUIThemeSwitch';
import { Link } from 'react-router-dom';
import logo from '../../assets/titlelogo.png';

export const Header = () => {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }
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
          <MUIThemeSwitch
            sx={{ m: 1, ml: 'auto' }}
            checked={mode !== null ? mode === 'dark' : false}
            onChange={(event) => setMode(event.target.checked ? 'dark' : 'light')}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

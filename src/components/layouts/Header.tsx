import { AppBar, Box, Toolbar } from '@mui/material';
import { MUIThemeSwitch } from '../buttons/MUIThemeSwitch';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { themeState } from '../../state/themeState';
import logo from '../../assets/titlelogo.png';

export const Header = () => {
  const [theme, setTheme] = useRecoilState(themeState);

  const switchHandler = (event: { target: { checked: boolean } }) => {
    const newTheme = event.target.checked ? 'dark' : 'light';
    setTheme(newTheme);
    sessionStorage.setItem('theme', newTheme);
  };

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
            checked={theme === 'dark'}
            onChange={switchHandler}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

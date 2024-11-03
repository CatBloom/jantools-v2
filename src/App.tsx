import { useRecoilValue } from 'recoil';
import { themeAtom } from './recoil/atoms';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Router } from './router';
import { lightTheme, darkTheme } from './theme';

export const App = () => {
  const mode = useRecoilValue(themeAtom);
  return (
    <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  );
};

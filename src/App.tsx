import { CssBaseline, ThemeProvider } from '@mui/material';
import { Router } from './Router';
import { lightTheme, darkTheme } from './theme';
import { useTheme } from './hooks/useTheme';

export const App = () => {
  const { theme } = useTheme();
  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  );
};

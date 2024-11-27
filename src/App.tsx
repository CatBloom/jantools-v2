import { CssBaseline, ThemeProvider } from '@mui/material';
import { router } from './router';
import { lightTheme, darkTheme } from './theme';
import { useTheme } from './hooks/useTheme';
import { RouterProvider } from 'react-router';

export const App = () => {
  const { theme } = useTheme();
  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

import { CssBaseline, ThemeProvider } from '@mui/material';
import { router } from './router';
import { useTheme } from './hooks/useTheme';
import { RouterProvider } from 'react-router';

export const App = () => {
  const { theme } = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

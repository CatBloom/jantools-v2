import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { router } from '@/router';
import { useTheme } from '@/hooks/useTheme';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const App = () => {
  const { theme } = useTheme();
  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          <RouterProvider router={router} />
        </LocalizationProvider>
      </ThemeProvider>
    </StrictMode>
  );
};

createRoot(document.getElementById('root')!).render(<App />);

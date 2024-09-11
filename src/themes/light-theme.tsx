import { createTheme } from '@mui/material/styles';
import { red, grey } from '@mui/material/colors';

export const lightTheme = createTheme({
  typography: {
    fontFamily: ['Noto Sans JP', 'monospace'].join(','),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1980,
    },
  },
  palette: {
    primary: {
      main: grey[800],
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#ffffff',
    },
  },
});

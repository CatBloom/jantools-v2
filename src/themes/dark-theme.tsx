import { createTheme } from '@mui/material/styles';
import { red, grey } from '@mui/material/colors';

export const darkTheme = createTheme({
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
    mode: 'dark',
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
      default: 'rgb(60, 60, 60)',
    },
  },
});

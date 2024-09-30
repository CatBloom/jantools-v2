import { createTheme } from '@mui/material/styles';
import { red, grey } from '@mui/material/colors';

// 共通の設定
const commonTheme = {
  typography: {
    fontFamily: ['Noto Sans JP', 'monospace'].join(','),
    fontSize: 14,
    h2: { fontSize: '25px', fontWeight: 500 },
    h3: { fontSize: '20px', fontWeight: 400 },
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
  },
};

// ダークテーマの設定
export const darkTheme = createTheme({
  ...commonTheme,
  palette: {
    ...commonTheme.palette,
    mode: 'dark',
    background: {
      default: 'rgb(60, 60, 60)',
    },
  },
});

// ライトテーマの設定
export const lightTheme = createTheme({
  ...commonTheme,
  palette: {
    ...commonTheme.palette,
    background: {
      default: '#ffffff',
    },
  },
});

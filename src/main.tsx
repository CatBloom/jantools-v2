import { StrictMode } from 'react';
import { RecoilRoot } from 'recoil';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { lightTheme, darkTheme } from './themes/';
import { useRecoilValue } from 'recoil';
import { themeState } from './state/themeState';

const Root = () => {
  const mode = useRecoilValue(themeState);
  return (
    <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecoilRoot>
      <Root />
    </RecoilRoot>
  </StrictMode>
);

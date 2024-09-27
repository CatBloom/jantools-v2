import { useSetRecoilState } from 'recoil';
import { loadingState } from './state/loadingState';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { lightTheme, darkTheme } from './themes';
import { useRecoilValue } from 'recoil';
import { themeState } from './state/themeState';

export const App = () => {
  const setLoading = useSetRecoilState(loadingState);
  const mode = useRecoilValue(themeState);

  // loading test
  const handler = async () => {
    setLoading(true);
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log('fetch');
        resolve();
      }, 2000);
    });
    setLoading(false);
  };

  return (
    <>
      <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
        <button onClick={handler}>スピナーテスト</button>
      </ThemeProvider>
    </>
  );
};

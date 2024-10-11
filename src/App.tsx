import { useSetRecoilState } from 'recoil';
import { loadingAtom, themeAtom } from './recoil/atoms';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { lightTheme, darkTheme } from './theme';
import { useRecoilValue } from 'recoil';

export const App = () => {
  const setLoading = useSetRecoilState(loadingAtom);
  const mode = useRecoilValue(themeAtom);

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

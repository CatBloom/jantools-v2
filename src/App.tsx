import { useRecoilState } from 'recoil';
import { loadingState } from './state/loadingState';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { lightTheme, darkTheme } from './themes';
import { useRecoilValue } from 'recoil';
import { themeState } from './state/themeState';

export function App() {
  const [loaging, setLoading] = useRecoilState(loadingState);
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
        {loaging ? <LoadingSpinner /> : <RouterProvider router={router} />}
        <button onClick={handler}>スピナーテスト</button>
      </ThemeProvider>
    </>
  );
}

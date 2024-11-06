import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { themeAtom } from '../recoil/atoms';

export const useTheme = () => {
  const [theme, setTheme] = useRecoilState(themeAtom);

  const setLight = useCallback(() => setTheme('light'), [setTheme]);
  const setDark = useCallback(() => setTheme('dark'), [setTheme]);

  const switchTheme = useCallback(
    (event: { target: { checked: boolean } }) => {
      const newTheme = event.target.checked ? 'dark' : 'light';
      setTheme(newTheme);
      sessionStorage.setItem('theme', newTheme);
    },
    [setTheme]
  );

  return { theme, setLight, setDark, switchTheme };
};
import { useCallback } from 'react';
import { themeAtom } from '../jotai';
import { useAtom } from 'jotai';

export const useTheme = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  const setLight = useCallback(() => setTheme('light'), [setTheme]);
  const setDark = useCallback(() => setTheme('dark'), [setTheme]);

  const switchTheme = useCallback(
    (event: { target: { checked: boolean } }) => {
      const newTheme = event.target.checked ? 'dark' : 'light';
      setTheme(newTheme);
    },
    [setTheme]
  );

  return { theme, setLight, setDark, switchTheme };
};

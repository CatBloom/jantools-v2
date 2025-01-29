import { useCallback, useMemo } from 'react';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { darkTheme, lightTheme } from '@/theme';

const themeAtom = atomWithStorage('theme', 'light');

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useAtom(themeAtom);
  const theme = useMemo(() => (currentTheme === 'dark' ? darkTheme : lightTheme), [currentTheme]);

  const switchTheme = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newTheme = event.target.checked ? 'dark' : 'light';
      setCurrentTheme(newTheme);
    },
    [setCurrentTheme]
  );

  return { theme, currentTheme, switchTheme };
};

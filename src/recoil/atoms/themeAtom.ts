import { atom } from 'recoil';

export const themeAtom = atom({
  key: 'themeAtom',
  default: sessionStorage.getItem('theme') === 'dark' ? 'dark' : 'light',
});

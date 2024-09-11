import { atom } from 'recoil';

export const themeState = atom({
  key: 'themeState',
  default: sessionStorage.getItem('theme') === 'dark' ? 'dark' : 'light',
});

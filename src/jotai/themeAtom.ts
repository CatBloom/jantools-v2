import { atom } from 'jotai';

export const themeAtom = atom(sessionStorage.getItem('theme') === 'dark' ? 'dark' : 'light');

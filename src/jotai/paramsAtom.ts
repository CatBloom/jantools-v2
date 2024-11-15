import { atom } from 'jotai';

export const paramWithIDAtom = atom<string | undefined>(undefined);

export const prevParamWithIDAtom = atom<string | undefined>(undefined);

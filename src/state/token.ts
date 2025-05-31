import { TokenStorage } from '@/types/common';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const tokensAtom = atomWithStorage<TokenStorage>('auth', {});
export const readonlyTokensAtom = atom((get) => get(tokensAtom));

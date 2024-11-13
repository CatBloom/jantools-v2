import { atom } from 'jotai';
import { League } from '../../../types/league';

export const leagueAtom = atom<League | null>(null);

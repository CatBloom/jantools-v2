import { atom } from 'recoil';
import { League } from '../../types/league';

export const leagueAtom = atom<League | null>({
  key: 'leagueAtom',
  default: null,
});

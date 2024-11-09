import { selectorFamily, useSetRecoilState } from 'recoil';
import { leagueAtom } from '../atoms/leagueAtom';
import { fetchLeague } from '../../../../api/services/leagueService';

export const leagueSelector = selectorFamily({
  key: 'leagueSelector',
  get: (leagueId?: string) => async () => {
    if (!leagueId) return null;
    const setLeague = useSetRecoilState(leagueAtom);
    const res = await fetchLeague(leagueId);
    setLeague(res);
    return res;
  },
});

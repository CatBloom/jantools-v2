import { selectorFamily } from 'recoil';
import { fetchLeague } from '../../../../api/services/leagueService';

export const leagueSelector = selectorFamily({
  key: 'leagueSelector',
  get: (leagueId?: string) => async () => {
    if (!leagueId) return null;
    return await fetchLeague(leagueId);
  },
});

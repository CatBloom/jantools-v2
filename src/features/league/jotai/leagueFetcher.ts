import { atom } from 'jotai';
import { fetchLeague } from '../../../api/services/leagueService';
import { paramWithIDAtom } from '../../../jotai/paramsAtom';

export const leagueFetcher = atom(async (get) => {
  const leagueID = get(paramWithIDAtom);
  if (!leagueID) return;
  return await fetchLeague(leagueID);
});

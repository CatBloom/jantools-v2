import { atom } from 'jotai';
import { fetchLeague } from '../../../api/services/leagueService';
import { paramWithIDAtom } from '../../../jotai/paramsAtom';

export const leagueFetcher = atom(async (get, { signal }) => {
  const leagueID = get(paramWithIDAtom);
  if (!leagueID) return null;
  return await fetchLeague(leagueID, signal);
});

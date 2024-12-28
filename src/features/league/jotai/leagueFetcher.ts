import { atomWithRefresh } from 'jotai/utils';
import { fetchLeague } from '../api/leagueService';
import { paramWithIDAtom } from '../../../jotai/paramsAtom';

export const leagueFetcher = atomWithRefresh(async (get, { signal }) => {
  const leagueID = get(paramWithIDAtom);
  if (!leagueID) return null;
  return await fetchLeague(leagueID, signal);
});

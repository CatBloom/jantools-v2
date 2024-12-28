import { atomWithRefresh } from 'jotai/utils';
import { fetchLeague } from '../api/leagueService';
import { readonlyParamWithIDAtom } from '../../../jotai/paramsAtom';

export const leagueFetcher = atomWithRefresh(async (get, { signal }) => {
  const leagueID = get(readonlyParamWithIDAtom);
  if (!leagueID) return null;
  return await fetchLeague(leagueID, signal);
});

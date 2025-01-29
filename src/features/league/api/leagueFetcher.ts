import { atomWithRefresh } from 'jotai/utils';
import { readonlyParamWithIDAtom } from '@/state/paramsState';
import { fetchLeague } from './leagueService';

export const leagueFetcher = atomWithRefresh(async (get, { signal }) => {
  const leagueID = get(readonlyParamWithIDAtom);
  if (!leagueID) return null;
  return await fetchLeague(leagueID, signal);
});

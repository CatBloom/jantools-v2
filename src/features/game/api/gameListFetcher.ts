import { atomWithRefresh } from 'jotai/utils';
import { readonlyParamWithIDAtom } from '@/state/paramsState';
import { fetchGameList } from './gameService';

export const gameListFetcher = atomWithRefresh(async (get, { signal }) => {
  const leagueID = get(readonlyParamWithIDAtom);
  if (!leagueID) return null;
  return await fetchGameList(leagueID, signal);
});

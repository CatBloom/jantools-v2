import { atomWithRefresh } from 'jotai/utils';
import { fetchGameList } from '../api/gameService';
import { readonlyParamWithIDAtom } from '../../../state/paramsState';

export const gameListFetcher = atomWithRefresh(async (get, { signal }) => {
  const leagueID = get(readonlyParamWithIDAtom);
  if (!leagueID) return null;
  return await fetchGameList(leagueID, signal);
});

import { atomWithRefresh } from 'jotai/utils';
import { fetchGameList } from '../api/gameService';
import { paramWithIDAtom } from '../../../jotai/paramsAtom';

export const gameListFetcher = atomWithRefresh(async (get, { signal }) => {
  const leagueID = get(paramWithIDAtom);
  if (!leagueID) return null;
  return await fetchGameList(leagueID, signal);
});

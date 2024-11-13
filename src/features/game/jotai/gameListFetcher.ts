import { atom } from 'jotai';
import { fetchGameList } from '../../../api/services/gameService';
import { paramWithIDAtom } from '../../../jotai/paramsAtom';

export const gameListFetcher = atom(async (get) => {
  const leagueID = get(paramWithIDAtom);
  if (!leagueID) return null;
  return await fetchGameList(leagueID);
});

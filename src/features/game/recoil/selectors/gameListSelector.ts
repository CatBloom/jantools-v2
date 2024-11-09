import { selectorFamily } from 'recoil';
import { fetchGameList } from '../../../../api/services/gameService';

export const gameListSelector = selectorFamily({
  key: 'gameListSelector',
  get: (leagueId?: string) => async () => {
    if (!leagueId) return null;
    const res = await fetchGameList(leagueId);
    return res;
  },
});

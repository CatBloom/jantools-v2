import { selectorFamily } from 'recoil';
import { fetchGameList } from '../../../../api/services/gameService';

export const gameListSelector = selectorFamily({
  key: 'gameListSelector',
  get: (leagueId?: string) => async () => {
    if (!leagueId) return null;
    return await fetchGameList(leagueId);
  },
});

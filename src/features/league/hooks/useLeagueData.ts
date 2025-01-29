import { useAtomValue } from 'jotai';
import { leagueFetcher } from '../api/leagueFetcher';

export const useLeagueData = () => {
  const league = useAtomValue(leagueFetcher);

  return { league };
};

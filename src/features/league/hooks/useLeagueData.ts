import { useAtomValue } from 'jotai';
import { leagueFetcher } from '../jotai/leagueFetcher';

export const useLeagueData = () => {
  const league = useAtomValue(leagueFetcher);

  return { league };
};

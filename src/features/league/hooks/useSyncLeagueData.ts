import { useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { leagueAtom, leagueFetcher } from '../jotai';

export const useSyncLeagueData = () => {
  const setLeague = useSetAtom(leagueAtom);
  const [featchGameList] = useAtom(leagueFetcher);

  useEffect(() => {
    if (featchGameList) {
      setLeague(featchGameList);
    }
  }, [featchGameList, setLeague]);
};

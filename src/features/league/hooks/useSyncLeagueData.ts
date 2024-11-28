import { useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { leagueAtom } from '../jotai/leagueAtom';
import { leagueFetcher } from '../jotai/leagueFetcher';
import { paramWithIDAtom, prevParamWithIDAtom } from '../../../jotai/paramsAtom';

export const useSyncLeagueData = () => {
  const setLeague = useSetAtom(leagueAtom);
  const featchLeague = useAtomValue(leagueFetcher);
  const currID = useAtomValue(paramWithIDAtom);
  const prevID = useAtomValue(prevParamWithIDAtom);

  useEffect(() => {
    if (!currID) return;
    if (currID !== prevID) {
      setLeague(featchLeague);
    }
  }, [currID, prevID, featchLeague, setLeague]);
};

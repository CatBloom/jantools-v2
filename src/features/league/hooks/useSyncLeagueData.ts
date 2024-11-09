import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { leagueAtom } from '../recoil/atoms/leagueAtom';
import { leagueSelector } from '../recoil/selectors/leagueSelector';

export const useSyncLeagueData = (id?: string) => {
  const setLeague = useSetRecoilState(leagueAtom);
  const leagueData = useRecoilValue(leagueSelector(id));

  useEffect(() => {
    if (leagueData) {
      setLeague(leagueData);
    }
  }, [leagueData, setLeague]);
};

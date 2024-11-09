import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { leagueAtom } from '../recoil/atoms/leagueAtom';
import { leagueSelector } from '../recoil/selectors/leagueSelector';

export const useSyncLeagueData = (id?: string) => {
  const [league, setLeague] = useRecoilState(leagueAtom);
  const leagueData = useRecoilValue(leagueSelector(id));

  useEffect(() => {
    if (leagueData && leagueData !== league) {
      setLeague(leagueData);
    }
  }, [league, leagueData, setLeague]);
};

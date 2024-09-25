import axios from 'axios';
import { League } from '../types/league';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '../state/loadingState';
import { useState } from 'react';

export const usePostLeagueData = () => {
  const setLoading = useSetRecoilState(loadingState);
  const [id, setID] = useState<string>('');
  const [error, setError] = useState<string>('');

  const postLeagueData = async (data: League) => {
    setLoading(true);
    try {
      const res = await axios.post<League>('http://localhost:8080/api/v2/league', data);
      if (res.data.id) {
        setID(res.data.id);
      } else {
        setError('error:empty id');
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.message) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return { postLeagueData, id, error };
};

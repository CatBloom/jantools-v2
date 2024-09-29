import axios from 'axios';
import { League } from '../types/league';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '../state/loadingState';
import { useState } from 'react';

export const useFetchLeagueData = () => {
  const setLoading = useSetRecoilState(loadingState);
  const [league, setLeague] = useState<League | null>(null);
  const [error, setError] = useState<string>('');
  const apiUrl: string = import.meta.env.VITE_API_URL;

  const fetchLeagueData = async (id: string) => {
    setLoading(true);
    try {
      const res = await axios.get<League>(`${apiUrl}/league/${id}`);
      if (res.data) {
        setLeague(res.data);
      } else {
        setError('error:empty league data');
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.message) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return { fetchLeagueData, league, error };
};

export const usePostLeagueData = () => {
  const setLoading = useSetRecoilState(loadingState);
  const [id, setID] = useState<string>('');
  const [error, setError] = useState<string>('');
  const apiUrl: string = import.meta.env.VITE_API_URL;

  const postLeagueData = async (data: League) => {
    setLoading(true);
    try {
      const res = await axios.post<League>(`${apiUrl}/league`, data);
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

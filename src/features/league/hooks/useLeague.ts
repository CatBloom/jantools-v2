import axios from 'axios';
import { useState } from 'react';
import { useLoading } from '../../../hooks/useLoading';
import { ReqCreateLeague } from '../../../types/league';
import { createLeague } from '../api/leagueService';
import { LeagueFormData } from '../types/form';

export const useLeague = () => {
  const loading = useLoading();
  const [error, setError] = useState<string>('');
  const errorEmpty = 'error:empty data';
  const errException = 'error: an unexpected error occurred';

  const create = async (formdata: LeagueFormData) => {
    const req: ReqCreateLeague = { ...formdata };
    try {
      loading.start();
      const res = await createLeague(req);
      if (res) {
        return res;
      } else {
        throw new Error(errorEmpty);
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.message) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(errException);
      }
    } finally {
      loading.finish();
    }
  };

  return { create, error };
};

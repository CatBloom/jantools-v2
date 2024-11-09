import axios from 'axios';
import { League, ReqCreateLeague } from '../../../types/league';
import { useState } from 'react';
import { createLeague, updateLeague, deleteLeague } from '../../../api/services/leagueService';
import { useRecoilState } from 'recoil';
import { leagueAtom } from '../recoil/atoms/leagueAtom';

export const useLeagueData = () => {
  const [league, setLeague] = useRecoilState(leagueAtom);
  const [error, setError] = useState<string>('');
  const errorEmpty = 'error:empty data';
  const errException = 'error: an unexpected error occurred';

  const createLeagueData = async (data: ReqCreateLeague, signal?: AbortSignal) => {
    try {
      const res = await createLeague(data, signal);
      if (res) {
        setLeague(res);
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
    }
  };

  const updateLeagueData = async (data: League, signal?: AbortSignal) => {
    try {
      const res = await updateLeague(data, signal);
      if (res) {
        setLeague(res);
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
    }
  };

  const daleteLeagueData = async (id: string, signal?: AbortSignal) => {
    try {
      const res = await deleteLeague(id, signal);
      if (res) {
        setLeague(null);
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
    }
  };

  return { league, error, createLeagueData, updateLeagueData, daleteLeagueData };
};

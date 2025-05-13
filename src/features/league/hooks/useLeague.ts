import { useLoading } from '@/hooks/useLoading';
import { useNotice } from '@/hooks/useNotice';
import { LeagueFormData } from '@/types/league';
import { createLeague } from '../api/leagueService';

export const useLeague = () => {
  const loading = useLoading();
  const { set } = useNotice();
  const errorEmpty = 'error:empty data';

  const create = async (data: LeagueFormData) => {
    try {
      loading.start();
      const res = await createLeague(data);
      if (res) {
        return res;
      } else {
        throw new Error(errorEmpty);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
      set({ severity: 'error' });
    } finally {
      loading.finish();
    }
  };

  return { create };
};

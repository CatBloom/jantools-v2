import { Stack, Typography } from '@mui/material';
import { ReqCreateLeague } from '../../types/league';
import { LeagueForm } from './components/LeagueForm';
import { useLeagueData } from './hooks/useLeagueData';
import { LeagueFormData } from './types/form';
import { useLoading } from '../../hooks/useLoading';

export const LeagueRegister = (props: { success: (id: string, name: string) => void }) => {
  const { success } = props;

  const loading = useLoading();
  const { createLeagueData } = useLeagueData();

  const submit = async (formdata: LeagueFormData) => {
    const req: ReqCreateLeague = { ...formdata };

    try {
      loading.start();
      const res = await createLeagueData(req);
      if (res) {
        success(res.id, res.name);
      } else {
        console.error('error:empty league id');
      }
    } catch (err) {
      console.error(err);
    } finally {
      loading.finish();
    }
  };

  return (
    <Stack spacing={1}>
      <Typography variant="h2">大会登録</Typography>
      <LeagueForm submit={submit}></LeagueForm>
    </Stack>
  );
};

import { Stack, Typography } from '@mui/material';
import { LeagueForm } from './components/LeagueForm';
import { useLeague } from './hooks/useLeague';
import { LeagueFormData } from './types/form';

export const LeagueRegister = (props: { success: (id: string, name: string) => void }) => {
  const { success } = props;

  const { create } = useLeague();
  const submit = async (formdata: LeagueFormData) => {
    const res = await create(formdata);
    if (res) {
      success(res.id, res.name);
    }
  };

  return (
    <Stack spacing={1}>
      <Typography variant="h2">大会登録</Typography>
      <LeagueForm submit={submit}></LeagueForm>
    </Stack>
  );
};

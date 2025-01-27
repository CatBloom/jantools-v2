import { Stack, Typography } from '@mui/material';
import { LeagueForm } from './components/LeagueForm';
import { useLeague } from './hooks/useLeague';
import { LeagueFormData } from './types/form';
import { useNavigate } from 'react-router';

export const LeagueRegister = (props: { addFavorite: (id: string, name: string) => void }) => {
  const { addFavorite } = props;

  const { create } = useLeague();
  const navigate = useNavigate();

  const submit = async (formdata: LeagueFormData) => {
    const res = await create(formdata);
    if (res) {
      addFavorite(res.id, res.name);
      navigate(`/detail/${res.id}`);
    }
  };

  return (
    <Stack spacing={1}>
      <Typography variant="h2">大会登録</Typography>
      <LeagueForm submit={submit}></LeagueForm>
    </Stack>
  );
};

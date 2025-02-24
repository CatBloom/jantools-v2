import { Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { LeagueFormData } from '@/types/league';
import { LeagueForm } from './components/LeagueForm';
import { useLeague } from './hooks/useLeague';

export const LeagueRegister = (props: { addFavorite: (id: string, name: string) => void }) => {
  const { addFavorite } = props;

  const { create } = useLeague();
  const navigate = useNavigate();

  const submit = async (formData: LeagueFormData) => {
    const res = await create(formData);
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

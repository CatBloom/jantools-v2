import { Stack, Typography } from '@mui/material';
import { ReqCreateLeague } from '../../types/league';
import { useSetRecoilState } from 'recoil';
import { loadingAtom } from '../../recoil/atoms';
import { LeagueForm } from './components/LeagueForm';
import { useLeagueData } from './hooks/useLeagueData';
import { useNavigate } from 'react-router-dom';
import { LeagueFormData } from './types/form';

export const LeagueRegister = () => {
  const setLoading = useSetRecoilState(loadingAtom);
  const { createLeagueData } = useLeagueData();
  const navigate = useNavigate();

  const submit = async (formdata: LeagueFormData) => {
    const req: ReqCreateLeague = { ...formdata };

    setLoading(true);
    try {
      const res = await createLeagueData(req);
      if (res) {
        navigate(`/detail/${res.id}`);
      } else {
        console.error('error:empty league id');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing={1}>
      <Typography variant="h2">大会登録</Typography>
      <LeagueForm submit={submit}></LeagueForm>
    </Stack>
  );
};

import { Box, Container, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLeagueData } from '../hooks/useLeagueData';
import { loadingAtom } from '../recoil/atoms';
import { useSetRecoilState } from 'recoil';
import { LeagueFormData, ReqCreateLeague } from '../types/league';
import { LeagueForm } from '../features/leagueForm/LeagueForm';

export const Home = () => {
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
    <>
      <Box
        component="img"
        src="https://catbloom-images.s3.ap-northeast-1.amazonaws.com/jantools_top_image.jpg"
        alt="Logo"
        sx={{
          width: 1,
        }}
      ></Box>
      <Container maxWidth="md">
        <Stack spacing={3} mt={2}>
          <Typography variant="h1">雀Tools</Typography>
          <Typography component="p">
            麻雀の成績管理アプリです。
            <br />
            大会登録を行い、成績を入力することで、全体の成績やプレイヤーごとの成績を簡単に管理できます。
          </Typography>
          <LeagueForm submit={submit}></LeagueForm>
        </Stack>
      </Container>
    </>
  );
};

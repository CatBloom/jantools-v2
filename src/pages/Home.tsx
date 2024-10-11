import { Box, Container } from '@mui/material';
import { Suspense, lazy } from 'react';
import { LoadingSpinner } from '../components';
import { useNavigate } from 'react-router-dom';
import { useLeagueData } from '../hooks/useLeagueData';
import { loadingAtom } from '../recoil/atoms';
import { useSetRecoilState } from 'recoil';
import { League } from '../types/league';
const LeagueForm = lazy(() => import('../components/forms/LeagueForm'));

export const Home = () => {
  const setLoading = useSetRecoilState(loadingAtom);
  const { createLeagueData } = useLeagueData();
  const navigate = useNavigate();

  const submit = async (league: League) => {
    setLoading(true);
    try {
      const res = await createLeagueData(league);
      if (res?.id) {
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
    <Box
      sx={{
        minHeight: '100vh',
      }}
    >
      <Box
        component="img"
        src="https://catbloom-images.s3.ap-northeast-1.amazonaws.com/jantools_top_image.jpg"
        alt="Logo"
        sx={{
          width: 1,
        }}
      ></Box>
      <Suspense fallback={<LoadingSpinner />}>
        <Container maxWidth="md">
          <LeagueForm submit={submit}></LeagueForm>
        </Container>
      </Suspense>
    </Box>
  );
};

import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { Container } from '@mui/material';
import { lazy } from 'react';
import { Suspense } from 'react';
import { LoadingSpinner } from '../components/LoadingSpinner';
const LeagueForm = lazy(() => import('../components/forms/LeagueForm'));

export function Home() {
  return (
    <>
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
        <Link to="/about">about</Link>
        <Suspense fallback={<LoadingSpinner />}>
          <Container maxWidth="md">
            <LeagueForm></LeagueForm>
          </Container>
        </Suspense>
      </Box>
    </>
  );
}

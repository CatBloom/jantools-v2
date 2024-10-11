import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Suspense } from 'react';
import { Container, Box } from '@mui/material';
import { LoadingSpinner } from '../LoadingSpinner';
import { Header, Footer } from './index';
import { useRecoilValue } from 'recoil';
import { loadingAtom } from '../../recoil/atoms';

export const AppLayout = () => {
  const loading = useRecoilValue(loadingAtom);
  return (
    <>
      <Header />
      <Box sx={{ position: 'relative', minHeight: '100vh' }}>
        {loading && <LoadingSpinner />}
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};

export const ContentLayout = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <ScrollRestoration />
        <Container sx={{ mt: '2rem' }} maxWidth="md">
          <Outlet />
        </Container>
      </Suspense>
    </>
  );
};

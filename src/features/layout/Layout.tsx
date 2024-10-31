import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Suspense } from 'react';
import { Container, Box, Stack } from '@mui/material';
import { Header, Footer, LoadingSpinner } from '../../components';
import { useRecoilValue } from 'recoil';
import { loadingAtom } from '../../recoil/atoms';

export const AppLayout = () => {
  const loading = useRecoilValue(loadingAtom);
  return (
    <>
      <Header />
      <Stack sx={{ minHeight: '100vh' }}>
        <Box sx={{ flex: 1, position: 'relative' }}>
          {loading && <LoadingSpinner />}
          <Outlet />
        </Box>
        <Footer />
      </Stack>
    </>
  );
};

export const ContentLayout = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ScrollRestoration />
      <Container sx={{ mt: '2rem' }} maxWidth="md">
        <Outlet />
      </Container>
    </Suspense>
  );
};

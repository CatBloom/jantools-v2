import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Suspense } from 'react';
import { Container, Box, Stack } from '@mui/material';
import { Header, Footer, LoadingSpinner } from '../../components';
import { useLoading } from '../../hooks/useLoading';

export const AppLayout = () => {
  const loading = useLoading();
  return (
    <>
      <Header />
      <Stack sx={{ minHeight: '100vh' }}>
        <Box sx={{ flex: 1, position: 'relative' }}>
          {loading.isLoading && <LoadingSpinner />}
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

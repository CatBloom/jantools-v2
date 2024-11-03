import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Suspense } from 'react';
import { Container } from '@mui/material';
import { LoadingSpinner } from '../../components';

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

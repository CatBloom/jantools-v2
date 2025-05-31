import { Suspense } from 'react';
import { Outlet, ScrollRestoration } from 'react-router';
import { Container } from '@mui/material';
import { LoadingSpinner } from '../LoadingSpinner';

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

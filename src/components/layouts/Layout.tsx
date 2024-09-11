import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Suspense } from 'react';
import { Container } from '@mui/material';
import { LoadingSpinner } from '../LoadingSpinner';

export const Layout = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <ScrollRestoration />
        <Container maxWidth="md">
          <Outlet />
        </Container>
      </Suspense>
    </>
  );
};

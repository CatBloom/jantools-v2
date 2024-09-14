import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Suspense } from 'react';
import { Container } from '@mui/material';
import { LoadingSpinner } from '../LoadingSpinner';
import { Header, Footer } from './index';

export const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export const ContentLayout = () => {
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

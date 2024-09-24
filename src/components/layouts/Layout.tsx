import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Suspense } from 'react';
import { Container } from '@mui/material';
import { LoadingSpinner } from '../LoadingSpinner';
import { Header, Footer } from './index';
import { useRecoilValue } from 'recoil';
import { loadingState } from '../../state/loadingState';

export const AppLayout = () => {
  const loading = useRecoilValue(loadingState);
  return (
    <>
      <Header />
      {loading ? <LoadingSpinner /> : <Outlet />}
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

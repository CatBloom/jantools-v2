import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Container from '@mui/material/Container';
import { LoagingSpinner } from '../LoadingSpinner';

export const Layout = () => {
  return (
    <>
      <Suspense fallback={<LoagingSpinner />}>
        <Container maxWidth="md">
          <Outlet />
        </Container>
      </Suspense>
    </>
  );
};

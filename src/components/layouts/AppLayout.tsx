import { Outlet } from 'react-router';
import { Box, Stack } from '@mui/material';
import { useLoading } from '@/hooks/useLoading';
import { useSetIDParam } from '@/state/paramsState';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { LoadingSpinner } from '../LoadingSpinner';

export const AppLayout = () => {
  const { isLoading } = useLoading();
  // param'id'をstateとして保管するhook
  useSetIDParam();
  return (
    <>
      <Header />
      <Stack sx={{ minHeight: '100vh' }}>
        <Box sx={{ flex: 1, position: 'relative' }}>
          {isLoading && <LoadingSpinner />}
          <Outlet />
        </Box>
        <Footer />
      </Stack>
    </>
  );
};

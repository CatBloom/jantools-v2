import { Outlet } from 'react-router-dom';
import { Box, Stack } from '@mui/material';
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

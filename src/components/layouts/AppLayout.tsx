import { Outlet } from 'react-router';
import { Box, Stack } from '@mui/material';
import { Header, Footer, LoadingSpinner } from '../../components';
import { useLoading, useSetIDParam } from '../../hooks';

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

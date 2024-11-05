import { Outlet } from 'react-router-dom';
import { Box, Stack } from '@mui/material';
import { Header, Footer, LoadingSpinner } from '../../components';
import { useLoading } from '../../hooks';

export const AppLayout = () => {
  const { isLoading } = useLoading();
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

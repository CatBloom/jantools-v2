import { Outlet } from 'react-router';
import { Alert, Box, Stack } from '@mui/material';
import { useLoading } from '@/hooks/useLoading';
import { useNotice } from '@/hooks/useNotice';
import { useSetIDParam } from '@/state/paramsState';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { LoadingSpinner } from '../LoadingSpinner';

export const AppLayout = () => {
  const { isLoading } = useLoading();
  const { notice, clear } = useNotice();
  // param'id'をstateとして保管するhook
  useSetIDParam();
  return (
    <>
      <Header />
      {notice && (
        <Alert
          severity={notice.severity}
          onClose={() => {
            clear();
          }}
          sx={{
            zIndex: 1000,
            position: 'absolute',
            width: '100%',
          }}
        >
          {notice.message}
        </Alert>
      )}
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

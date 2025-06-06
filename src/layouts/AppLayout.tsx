import { Outlet } from 'react-router';
import { Alert, Box, Stack } from '@mui/material';
import { useLoading } from '@/hooks/useLoading';
import { useNotice } from '@/hooks/useNotice';
import { useSetIDParam } from '@/state/params';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LoadingSpinner } from '@/components/LoadingSpinner';

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

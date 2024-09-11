import { CircularProgress, Box } from '@mui/material/';

export function LoagingSpinner() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress color={'secondary'} size={100} />
      </Box>
    </>
  );
}

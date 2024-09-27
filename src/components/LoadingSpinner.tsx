import { CircularProgress, Box, useTheme } from '@mui/material';

export function LoadingSpinner() {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: theme.palette.background.default,
          opacity: 0.9,
          zIndex: 9999,
        }}
      >
        <CircularProgress color={'secondary'} size={100} />
      </Box>
    </>
  );
}

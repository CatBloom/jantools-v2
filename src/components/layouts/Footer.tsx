import { Box, useTheme } from '@mui/material';
import { Typography } from '@mui/material';
import { IconGithub } from '../icons';

export const Footer = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: theme.palette.primary.dark,
        height: '10vh',
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          color: '#ffffff',
        }}
      >
        <Typography component="p" sx={{ p: '0.5rem' }}>
          © 2022 JanTools CatBloom
        </Typography>
        <a href="https://github.com/CatBloom" target="_blank" rel="noopener noreferrer">
          <IconGithub />
        </a>
      </Box>
    </Box>
  );
};

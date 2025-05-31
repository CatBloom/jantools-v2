import { Box, Typography } from '@mui/material';
import { IconGithub } from '@/components/icons/IconGithub';

export const Footer = () => {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.palette.primary.dark,
        p: '1rem 0',
        mt: '2rem',
      })}
      component="footer"
    >
      <Box
        sx={{
          textAlign: 'center',
          color: '#ffffff',
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <Typography component="p" sx={{ p: '0.5rem', m: 0 }}>
            © 2022 JanTools CatBloom
          </Typography>
          <a href="https://github.com/CatBloom" target="_blank" rel="noopener noreferrer">
            <IconGithub />
          </a>
        </Box>
      </Box>
    </Box>
  );
};

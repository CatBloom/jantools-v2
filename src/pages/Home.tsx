import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <>
      <Box
        sx={{
          height: '100vh',
        }}
      >
        <Box
          component="img"
          src="https://catbloom-images.s3.ap-northeast-1.amazonaws.com/jantools_top_image.jpg"
          alt="Logo"
          sx={{
            width: 1,
          }}
        ></Box>
        <Link to="/about">about</Link>
      </Box>
    </>
  );
}

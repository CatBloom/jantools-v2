import { Box, Container, Stack, Typography } from '@mui/material';
import { LeagueRegister } from '../features/league/LeagueRegister';

export const Home = () => {
  return (
    <>
      <Box
        component="img"
        src="https://catbloom-images.s3.ap-northeast-1.amazonaws.com/jantools_top_image.jpg"
        alt="Logo"
        sx={{
          width: 1,
        }}
      ></Box>
      <Container maxWidth="md">
        <Stack spacing={3} mt={2}>
          <Typography variant="h1">雀Tools</Typography>
          <Typography component="p">
            麻雀の成績管理アプリです。
            <br />
            大会登録を行い、成績を入力することで、全体の成績やプレイヤーごとの成績を簡単に管理できます。
          </Typography>
          <LeagueRegister></LeagueRegister>
        </Stack>
      </Container>
    </>
  );
};

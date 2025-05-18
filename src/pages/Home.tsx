import { Box, Container, Stack, Typography } from '@mui/material';
import { LeagueRegister } from '@/features/league/LeagueRegister';
import { useFavorite } from '@/features/favorite/hooks/useFavorite';

export const Home = () => {
  const { addFavorite } = useFavorite();

  return (
    <>
      <Box
        sx={{
          width: 1,
          height: { xs: 'auto', md: 430 },
          position: 'relative',
        }}
      >
        <Box
          component="img"
          src="https://static.catbloom.net/jantools_top_image.webp"
          alt="Logo"
          sx={{
            width: 1,
            height: { xs: 'auto', md: '100%' },
            objectFit: { xs: 'contain', md: 'cover' },
            objectPosition: 'top',
          }}
        />
      </Box>

      <Container maxWidth="md">
        <Stack spacing={3} mt={4}>
          <Typography variant="h1">雀Tools</Typography>
          <Typography component="p">
            麻雀の成績管理アプリです。
            <br />
            大会登録を行い、成績を入力することで、全体の成績やプレイヤーごとの成績を簡単に管理できます。
          </Typography>
          <LeagueRegister addFavorite={addFavorite} />
        </Stack>
      </Container>
    </>
  );
};

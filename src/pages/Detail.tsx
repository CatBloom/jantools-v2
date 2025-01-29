import { Divider, Stack, Typography, Tabs, Tab, Button } from '@mui/material';
import { useParams } from 'react-router';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useTab } from '@/hooks/useTab';
import { LeagueRuleList } from '@/features/league/LeagueRuleList';
import { useLeagueData } from '@/features/league/hooks/useLeagueData';
import { GameTotalTable } from '@/features/game/GameTotalTable';
import { GameResultTable } from '@/features/game/GameResultTable';
import { GameRegister } from '@/features/game/GameRegister';
import { FavoriteToggle } from '@/features/favorite/FavoriteToggle';
import { dateFormat } from '@/utils/date';

export const Detail = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const { tabValue, switchTab } = useTab('detail');
  const { id } = useParams();
  const { league } = useLeagueData();

  if (!league || !id) return null;

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap">
        <Tabs
          value={tabValue}
          onChange={switchTab}
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab value="detail" label="詳細"></Tab>
          <Tab value="edit" label="成績管理"></Tab>
        </Tabs>
        <FavoriteToggle favorite={{ id: league.id, name: league.name }} />
      </Stack>

      {tabValue === 'detail' && (
        <Stack spacing={3}>
          <>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
            >
              <Typography flexGrow="1" variant="h2">
                {league.name}
              </Typography>
              <Typography component="p">作成日:{dateFormat(league.createdAt)}</Typography>
            </Stack>
            {league.manual && (
              <Stack spacing={1}>
                <Typography variant="h3">詳細</Typography>
                <Divider />
                <Typography component="p">{league.manual}</Typography>
              </Stack>
            )}
            <Stack spacing={1}>
              <Typography variant="h3">ルール</Typography>
              <Divider />
              <LeagueRuleList rule={league.rule} />
            </Stack>
          </>

          <GameTotalTable id={id}></GameTotalTable>
        </Stack>
      )}

      {tabValue === 'edit' && (
        <Stack spacing={3}>
          <Stack direction="row">
            <Typography minWidth="15rem" variant="h2">
              成績管理
            </Typography>
          </Stack>

          <Stack>
            <Button variant="contained" color="secondary" onClick={open}>
              成績登録
            </Button>
            <GameResultTable id={id} isDeleted></GameResultTable>
          </Stack>
        </Stack>
      )}
      <GameRegister rule={league.rule} isOpen={isOpen} close={close}></GameRegister>
    </Stack>
  );
};

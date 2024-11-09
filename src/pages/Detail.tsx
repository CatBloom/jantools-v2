import { Divider, Stack, Typography, Tabs, Tab, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { dateFormat } from '../utils/date';
import { useRecoilValue } from 'recoil';
import { GameResultTable, GameTotalTable, GameRegister } from '../features/game';
import { LeagueRuleList } from '../features/league/';
import { useTab, useDisclosure } from '../hooks';
import { useSyncLeagueData } from '../features/league/hooks/useSyncLeagueData';
import { useSyncGameListData } from '../features/game/hooks/useSyncGameListData';
import { useLeagueData } from '../features/league/hooks/useLeagueData';
import {
  gameResultSelector,
  gameResultTotalSelector,
} from '../features/game/recoil/selectors/gameSelector';

export default function Detail() {
  const { isOpen, open, close } = useDisclosure(false);
  const { tabValue, switchTab } = useTab('detail');
  const { id } = useParams();

  useSyncLeagueData(id);
  useSyncGameListData(id);
  const { league } = useLeagueData();
  const gameResults = useRecoilValue(gameResultSelector());
  const gameResultTotal = useRecoilValue(gameResultTotalSelector);

  return (
    <Stack spacing={3}>
      <Tabs value={tabValue} onChange={switchTab} textColor="secondary" indicatorColor="secondary">
        <Tab value="detail" label="詳細"></Tab>
        <Tab value="edit" label="成績管理"></Tab>
      </Tabs>
      {league && id && (
        <>
          {tabValue === 'detail' && (
            <Stack spacing={3}>
              <>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  flexWrap="wrap"
                >
                  <Typography minWidth="15rem" variant="h2">
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

              {gameResultTotal && (
                <GameTotalTable leagueID={id} gameResultTotal={gameResultTotal}></GameTotalTable>
              )}
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

                {gameResults && (
                  <GameResultTable games={gameResults} leagueID={id}></GameResultTable>
                )}
              </Stack>
            </Stack>
          )}
          <GameRegister
            leagueID={id}
            rule={league.rule}
            isOpen={isOpen}
            close={close}
          ></GameRegister>
        </>
      )}
    </Stack>
  );
}

import { useEffect, useMemo } from 'react';
import { Divider, Stack, Typography, Tabs, Tab, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { dateFormat } from '../utils/date';
import { GameResultTable, GameTotalTable, GameRegister } from '../features/game';
import { LeagueRuleList } from '../features/league/';
import { useTab, useDisclosure, useLoading } from '../hooks';
import { useLeagueData } from '../features/league/hooks/useLeagueData';
import { useGameData } from '../features/game/hooks/useGameData';
import { useAtom } from 'jotai';
import { gameResultTotalAtom, gameResultsAtom } from '../features/game/jotai';

export default function Detail() {
  const { isOpen, open, close } = useDisclosure(false);
  const { tabValue, switchTab } = useTab('detail');
  const { id } = useParams();
  const { start, finish } = useLoading();
  const { league, fetchLeagueData } = useLeagueData();
  const { fetchGameListData } = useGameData();

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async (id: string) => {
      start();
      await Promise.all([
        fetchLeagueData(id, abortController.signal),
        fetchGameListData(id, abortController.signal),
      ]);
      finish();
    };

    if (!id) return;

    fetchData(id);

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const [gameResults] = useAtom(useMemo(() => gameResultsAtom(), []));
  const [gameResultTotal] = useAtom(gameResultTotalAtom);

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
                  <GameResultTable games={gameResults} leagueID={id} isDeleted></GameResultTable>
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

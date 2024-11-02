import React from 'react';
import { useEffect, useState } from 'react';
import { Divider, Stack, Typography, Tabs, Tab, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { dateFormat } from '../utils/date';
import { useConfirmDialog } from '../hooks/useConfirmDialog';
import { useRecoilValue } from 'recoil';
import { gameResultTotalSelector, gameResultCreateAtDescSelector } from '../recoil/selectors';
import { GameResultTable, GameTotalTable, GameRegisterDialog } from '../features/game';
import { RuleList } from '../features/league';
import { useLeagueData } from '../features/league/hooks/useLeagueData';
import { useGameData } from '../features/game/hooks/useGameData';
import { GameDeleteDialog } from '../features/game/GameDeleteDialog';
import { useLoading } from '../hooks/useLoading';

export default function Detail() {
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState('detail');
  const { league, fetchLeagueData } = useLeagueData();
  const { fetchGameListData } = useGameData();
  const { confirmOpen, openConfirmDialog, closeConfirmDialog } = useConfirmDialog();
  const { id } = useParams();
  const loading = useLoading();
  const gameResultTotal = useRecoilValue(gameResultTotalSelector);
  const gameResultCreateAtDesc = useRecoilValue(gameResultCreateAtDescSelector);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async (id: string) => {
      loading.start();
      await Promise.all([
        fetchLeagueData(id, abortController.signal),
        fetchGameListData(id, abortController.signal),
      ]);
      loading.finish();
    };

    if (!id) {
      return;
    }
    fetchData(id);

    return () => {
      abortController.abort();
    };
  }, [id]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    event.preventDefault();
    setTabValue(newValue);
  };

  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

  return (
    <Stack spacing={3}>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        textColor="secondary"
        indicatorColor="secondary"
      >
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
                  {league.createdAt && (
                    <Typography component="p">作成日:{dateFormat(league.createdAt)}</Typography>
                  )}
                </Stack>
                {league.manual && (
                  <Stack spacing={1}>
                    <Typography variant="h3">詳細</Typography>
                    <Divider />
                    <Typography component="p">{league.manual}</Typography>
                  </Stack>
                )}
                {league.rule && (
                  <Stack spacing={1}>
                    <Typography variant="h3">ルール</Typography>
                    <Divider />
                    <RuleList rule={league.rule} />
                  </Stack>
                )}
              </>

              {gameResultTotal && (
                <GameTotalTable gameResultTotal={gameResultTotal}></GameTotalTable>
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
                <Button variant="contained" color="secondary" onClick={handleModalOpen}>
                  成績登録
                </Button>

                {gameResultCreateAtDesc && (
                  <GameResultTable
                    games={gameResultCreateAtDesc}
                    leagueID={id}
                    openConfirmDialog={openConfirmDialog}
                  ></GameResultTable>
                )}
              </Stack>
            </Stack>
          )}
          <GameRegisterDialog
            leagueID={id}
            rule={league.rule}
            open={open}
            handleModalClose={handleModalClose}
          ></GameRegisterDialog>
          <GameDeleteDialog
            open={confirmOpen}
            handleModalClose={closeConfirmDialog}
          ></GameDeleteDialog>
        </>
      )}
    </Stack>
  );
}

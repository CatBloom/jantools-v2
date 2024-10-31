import React from 'react';
import { useEffect, useState } from 'react';
import { ModalContainer } from '../components';
import { RuleList } from '../features/league';
import { Divider, Stack, Typography, Tabs, Tab, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { dateFormat } from '../utils/date';
import { useLeagueData } from '../features/league/hooks/useLeagueData';
import { useGameData } from '../features/game/hooks/useGameData';
import { useConfirmDialog } from '../hooks/useConfirmDialog';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { gameResultTotalSelector, gameResultCreateAtDescSelector } from '../recoil/selectors';
import { loadingAtom } from '../recoil/atoms';
import { GameResultTable, GameTotalTable } from '../features/game';
import { GameRegisterDialog } from '../features/game/GameRegisterDialog';

export default function Detail() {
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState('detail');
  const { league, fetchLeagueData } = useLeagueData();
  const { fetchGameListData, deleteGameData } = useGameData();
  const { confirmOpen, openConfirmDialog, closeConfirmDialog } = useConfirmDialog();
  const { id } = useParams();
  const setLoading = useSetRecoilState(loadingAtom);
  const gameResultTotal = useRecoilValue(gameResultTotalSelector);
  const gameResultCreateAtDesc = useRecoilValue(gameResultCreateAtDescSelector);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async (id: string) => {
      setLoading(true);
      await Promise.all([
        fetchLeagueData(id, abortController.signal),
        fetchGameListData(id, abortController.signal),
      ]);
      setLoading(false);
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
  const deleteGame = async (gid: string) => {
    if (!id) {
      return;
    }

    const result = await openConfirmDialog();
    if (!result) {
      return;
    }

    setLoading(true);
    try {
      await deleteGameData(gid, id);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
      {league && (
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
                    deleteGame={deleteGame}
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
          <ModalContainer
            modalTitle="成績削除"
            open={confirmOpen}
            onClose={() => closeConfirmDialog()}
          >
            <>
              <Button
                variant="contained"
                color="error"
                onClick={() => closeConfirmDialog('confirm')}
              >
                削除
              </Button>
            </>
          </ModalContainer>
        </>
      )}
    </Stack>
  );
}

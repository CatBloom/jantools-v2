import { useEffect, useState } from 'react';
import { RuleList, GameTotalRow, ModalContainer } from '../components';
import { Divider, Stack, Typography, Tabs, Tab, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Game, GameResultTotal, GameFormData, ReqCreateGame } from '../types/game';
import { Column } from '../types/common';
import { dateFormat } from '../utils/date';
import { useLeagueData } from '../hooks/useLeagueData';
import { useGameData } from '../hooks/useGameData';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  gamePlayerSelector,
  gameResultTotalSelector,
  gameResultCreateAtDescSelector,
} from '../recoil/selectors';
import { loadingAtom } from '../recoil/atoms';
import { GameRow } from '../components/tables/GameRow';
import { GameForm } from '../components/forms/GameForm';

import { TableContainer } from '../components/tables/TableContainer';
import React from 'react';
import { useConfirmDialog } from '../hooks/useConfirmDialog';

export default function Detail() {
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState('detail');
  const { league, fetchLeagueData } = useLeagueData();
  const { fetchGameListData, createGameData, deleteGameData } = useGameData();
  const { confirmOpen, openConfirmDialog, closeConfirmDialog } = useConfirmDialog();
  const { id } = useParams();
  const setLoading = useSetRecoilState(loadingAtom);
  const gameResultTotal = useRecoilValue(gameResultTotalSelector);
  const gamePlayers = useRecoilValue(gamePlayerSelector);
  const gameResultCreateAtDesc = useRecoilValue(gameResultCreateAtDescSelector);

  const detailColumns: Column<GameResultTotal>[] = [
    { key: 'rank', display: '順位' },
    { key: 'name', display: '名前' },
    { key: 'gameCount', display: '対戦数' },
    { key: 'totalPoint', display: '合計得点' },
    { key: 'averageRank', display: '平均着順' },
  ];

  const editColumns: Column<Game>[] = [
    { key: 'createdAt', display: '登録日' },
    { key: 'results', display: '試合結果' },
  ];

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

  const submit = async (formdata: GameFormData) => {
    if (!id) {
      return;
    }
    const req: ReqCreateGame = { ...formdata, leagueID: id };

    setLoading(true);
    try {
      await createGameData(req);
      setOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
                <TableContainer<GameResultTotal>
                  columns={detailColumns}
                  align="center"
                  elevation={1}
                >
                  {gameResultTotal.map((row, i) => (
                    <React.Fragment key={i}>
                      <GameTotalRow row={row} align="center" />
                    </React.Fragment>
                  ))}
                </TableContainer>
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
                <Button variant="contained" onClick={handleModalOpen}>
                  成績登録
                </Button>

                {gameResultCreateAtDesc && (
                  <TableContainer<Game>
                    columns={editColumns}
                    align="center"
                    size="small"
                    elevation={1}
                  >
                    {gameResultCreateAtDesc.map((row, i) => (
                      <React.Fragment key={i}>
                        <GameRow row={row} align="center" handleDelete={deleteGame} />
                      </React.Fragment>
                    ))}
                  </TableContainer>
                )}
              </Stack>
            </Stack>
          )}
          <ModalContainer modalTitle="成績登録" open={open} onClose={handleModalClose}>
            <GameForm rule={league.rule} gamePlayers={gamePlayers} submit={submit} />
          </ModalContainer>
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

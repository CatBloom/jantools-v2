import { useEffect, useState } from 'react';
import { GeneralTable, RuleList, GameTotalRow } from '../components';
import { Button, Container, Divider, Modal, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { GameFormData, GameResultTotal, ReqCreateGame } from '../types/game';
import { Column } from '../types/common';
import { dateFormat } from '../utils/date';
import { useLeagueData } from '../hooks/useLeagueData';
import { useGameData } from '../hooks/useGameData';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { gamePlayerSelector, gameResultTotalSelector } from '../recoil/selectors';
import { loadingAtom } from '../recoil/atoms';
import { GameForm } from '../components/forms/GameForm';

export default function Detail() {
  const { league, fetchLeagueData } = useLeagueData();
  const { fetchGameListData, createGameData } = useGameData();
  const [open, setOpen] = useState(false);
  const setLoading = useSetRecoilState(loadingAtom);
  const gameResultTotal = useRecoilValue(gameResultTotalSelector);
  const gamePlayers = useRecoilValue(gamePlayerSelector);

  const { id } = useParams();

  const columns: Column<GameResultTotal>[] = [
    { key: 'rank', display: '順位' },
    { key: 'name', display: '名前' },
    { key: 'gameCount', display: '対戦数' },
    { key: 'totalPoint', display: '合計得点' },
    { key: 'averageRank', display: '平均着順' },
  ];

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async (id: string) => {
      setLoading(true);
      Promise.all([
        fetchLeagueData(id, abortController.signal),
        fetchGameListData(id, abortController.signal),
      ]);
      setLoading(false);
    };

    if (id) {
      fetchData(id);
    }
    return () => {
      abortController.abort();
    };
  }, [id]);

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Stack spacing={3}>
      {league && (
        <>
          <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap">
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
      )}

      <Button variant="contained" onClick={handleOpen}>
        成績登録
      </Button>
      <Modal open={open}>
        <Container
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            p: 2,
          }}
          maxWidth="sm"
        >
          {league && league.rule ? (
            <Stack spacing={2}>
              <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
                <Typography variant="h3">成績登録</Typography>
                <Button variant="text" onClick={handleClose}>
                  ❌
                </Button>
              </Stack>
              <GameForm rule={league.rule} gamePlayers={gamePlayers} submit={submit} />
            </Stack>
          ) : (
            <p>読み込みエラー</p>
          )}
        </Container>
      </Modal>

      {gameResultTotal && (
        <GeneralTable<GameResultTotal>
          rows={gameResultTotal}
          columns={columns}
          align="center"
          RowComponent={GameTotalRow}
        />
      )}
    </Stack>
  );
}

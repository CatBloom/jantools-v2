import { useEffect, useState } from 'react';
import { GeneralTable, RuleList, GameTotalRow } from '../components';
import { Divider, Stack, Typography, Tabs, Tab, Button, Container, Modal } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Game, GameResultTotal, GameFormData, ReqCreateGame } from '../types/game';
import { Column } from '../types/common';
import { dateFormat } from '../utils/date';
import { useLeagueData } from '../hooks/useLeagueData';
import { useGameData } from '../hooks/useGameData';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { gamePlayerSelector, gameResultTotalSelector } from '../recoil/selectors';
import { gameListAtom, loadingAtom } from '../recoil/atoms';
import { GameRow } from '../components/tables/GameRow';
import { GameForm } from '../components/forms/GameForm';

export default function Detail() {
  const [open, setOpen] = useState(false);
  const { league, fetchLeagueData } = useLeagueData();
  const { fetchGameListData, createGameData } = useGameData();
  const { id } = useParams();
  const setLoading = useSetRecoilState(loadingAtom);
  const gameResultTotal = useRecoilValue(gameResultTotalSelector);
  const gameList = useRecoilValue(gameListAtom);
  const gamePlayers = useRecoilValue(gamePlayerSelector);

  const [tabValue, setTabValue] = useState('detail');

  const detailColumns: Column<GameResultTotal>[] = [
    { key: 'rank', display: '順位' },
    { key: 'name', display: '名前' },
    { key: 'gameCount', display: '対戦数' },
    { key: 'totalPoint', display: '合計得点' },
    { key: 'averageRank', display: '平均着順' },
  ];

  const editColumns: Column<Game>[] = [
    { key: 'createdAt', display: '対戦日' },
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

  return (
    <Stack spacing={3}>
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab value="detail" label="詳細"></Tab>
        <Tab value="edit" label="成績編集"></Tab>
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
                <GeneralTable<GameResultTotal>
                  rows={gameResultTotal}
                  columns={detailColumns}
                  align="center"
                  RowComponent={GameTotalRow}
                />
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
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Typography variant="h3">成績登録</Typography>
                          <Button
                            variant="text"
                            sx={(theme) => ({
                              color: theme.palette.error.main,
                            })}
                            onClick={handleModalClose}
                          >
                            ✖︎
                          </Button>
                        </Stack>
                        <GameForm rule={league.rule} gamePlayers={gamePlayers} submit={submit} />
                      </Stack>
                    ) : (
                      <p>読み込みエラー</p>
                    )}
                  </Container>
                </Modal>
                {gameList && (
                  <GeneralTable<Game>
                    columns={editColumns}
                    RowComponent={GameRow}
                    rows={gameList}
                  ></GeneralTable>
                )}
              </Stack>
            </Stack>
          )}
        </>
      )}
    </Stack>
  );
}

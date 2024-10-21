import { GeneralTable } from '../components';
import { Column } from '../types/common';
import { Game, GameFormData, ReqCreateGame } from '../types/game';
import { GameRow } from '../components/tables/GameRow';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { gameListAtom, loadingAtom } from '../recoil/atoms';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGameData } from '../hooks/useGameData';
import { useLeagueData } from '../hooks/useLeagueData';
import { Button, Container, Modal, Stack, Typography } from '@mui/material';
import { gamePlayerSelector } from '../recoil/selectors';
import { GameForm } from '../components/forms/GameForm';

export default function Edit() {
  const columns: Column<Game>[] = [
    { key: 'createdAt', display: '対戦日' },
    { key: 'results', display: '試合結果' },
  ];
  const { league, fetchLeagueData } = useLeagueData();
  const { fetchGameListData, createGameData } = useGameData();
  const { id } = useParams();
  const gameList = useRecoilValue(gameListAtom);
  const gamePlayers = useRecoilValue(gamePlayerSelector);
  const setLoading = useSetRecoilState(loadingAtom);

  const [open, setOpen] = useState(false);

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

  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

  return (
    <Stack spacing={3}>
      {league && (
        <Stack direction="row">
          <Typography minWidth="15rem" variant="h2">
            {league.name} 成績管理
          </Typography>
        </Stack>
      )}

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
            columns={columns}
            RowComponent={GameRow}
            rows={gameList}
          ></GeneralTable>
        )}
      </Stack>
    </Stack>
  );
}

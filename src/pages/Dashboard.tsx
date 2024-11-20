import { useEffect, useMemo } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { GameResultTable } from '../features/game';
import { useAtomValue } from 'jotai';
import { gameResultsAtom } from '../features/game/jotai';
import { GameLineChart } from '../features/game/GameLineChart';

export default function Dashboard() {
  const { id, name } = useParams();
  const navigate = useNavigate();
  const gameResults = useAtomValue(useMemo(() => gameResultsAtom(name), [name]));

  useEffect(() => {
    if (!gameResults) {
      navigate(`/detail/${id}`);
    }
  }, [gameResults, id, name, navigate]);

  return (
    <Stack spacing={3}>
      {id && gameResults && (
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap">
            <Typography minWidth="15rem" variant="h2">
              {name}
            </Typography>
            <Button
              variant="outlined"
              onClick={() => {
                navigate(`/detail/${id}`);
              }}
            >
              詳細ページに戻る
            </Button>
          </Stack>
          <Stack direction="row" flexWrap="wrap" sx={{ width: '100%' }}>
            <GameLineChart></GameLineChart>
          </Stack>
          <GameResultTable leagueID={id} games={gameResults}></GameResultTable>
        </Stack>
      )}
    </Stack>
  );
}

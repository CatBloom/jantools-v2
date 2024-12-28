import { Button, Stack, Typography } from '@mui/material';
import { Navigate, useNavigate, useParams } from 'react-router';
import { GameStatsList } from '../features/game/GameStatsList';
import { GameLineChart } from '../features/game/GameLineChart';
import { GamePieChart } from '../features/game/GamePieChart';
import { GameResultTable } from '../features/game/GameResultTable';
import { useGameData } from '../features/game/hooks/useGameData';

export const Dashboard = () => {
  const { id, name } = useParams();
  const navigate = useNavigate();
  const { gameListData } = useGameData();

  if (!gameListData) {
    return <Navigate to={`/detail/${id}`} replace />;
  }

  return (
    <Stack spacing={3}>
      {id && name && (
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap">
            <Typography flexGrow="1" variant="h2">
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
          <Stack direction="row" flexWrap="wrap" width="100%">
            <Stack flexBasis="400px" flexGrow="1">
              <GameStatsList name={name} />
              <GameLineChart name={name} />
            </Stack>
            <Stack flexBasis="300px" flexGrow="1">
              <GamePieChart name={name} />
            </Stack>
          </Stack>
          <GameResultTable leagueID={id} name={name}></GameResultTable>
        </Stack>
      )}
    </Stack>
  );
};

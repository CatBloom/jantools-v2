import { useNavigate, useParams } from 'react-router';
import { TablePagination, TableRow } from '@mui/material';
import { Column } from '@/types/common';
import { Game, GameResult } from '@/types/game';
import { TableContainer } from '@/components/TableContainer';
import { usePagination } from '@/hooks/usePagination';
import { useGameData } from './hooks/useGameData';
import { GameResultRow } from './components/GameResultRow';
import { LeagueRule } from '@/types/league';

// isEditがtrueの際は、ルールが必須
type GameResultTabaleProps =
  | {
      name?: string;
      isEdit: true;
      rule: LeagueRule;
    }
  | {
      name?: string;
      isEdit: false;
      rule?: LeagueRule;
    };

export const GameResultTable = (props: GameResultTabaleProps) => {
  const { name, isEdit, rule } = props;

  const { id } = useParams();
  const { resultDescData } = useGameData();
  const navigate = useNavigate();
  // nameがある場合は、参加したゲームの結果のみ表示する
  const gameResults = name
    ? resultDescData.filter((game) => game.results.some((result) => result.name === name))
    : resultDescData;
  const columns: Column<Game>[] = [
    { key: 'createdAt', display: '登録日' },
    { key: 'results', display: '試合結果' },
  ];
  const { page, rowsPerPage, setPage, handleChangePage } = usePagination();

  const clickRow = (row: GameResult) => {
    setPage(0); // Paginationをリセット
    navigate(`/dashboard/${id}/${row.name}`);
  };

  if (!id) return null;

  return (
    <>
      <TableContainer<Game> columns={columns} align="center" size="small" elevation={1}>
        {gameResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => (
          <GameResultRow
            key={i}
            row={row}
            align="center"
            clickRow={isEdit ? undefined : clickRow}
            isEdit={isEdit}
            rule={isEdit ? rule : undefined}
          />
        ))}
        <TableRow>
          <TablePagination
            count={gameResults.length}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[rowsPerPage]}
            page={page}
            onPageChange={handleChangePage}
          />
        </TableRow>
      </TableContainer>
    </>
  );
};

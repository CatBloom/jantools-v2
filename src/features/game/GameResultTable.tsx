import { useNavigate } from 'react-router';
import { Column } from '../../types/common';
import { Game, GameResult } from '../../types/game';
import { useGameData } from './hooks/useGameData';
import { GameResultRow } from './components/GameResultRow';
import { GameDeleteConfirm } from './components/GameDeleteConfirm';
import { TableContainer } from '../../components/TableContainer';
import { TablePagination, TableRow } from '@mui/material';
import { useConfirm } from '../../hooks/useConfirm';
import { usePagination } from '../../hooks/usePagination';
import { useGame } from './hooks/useGame';

export const GameResultTable = (props: { id: string; name?: string; isDeleted?: boolean }) => {
  const { id, name, isDeleted } = props;

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
  const { remove } = useGame();
  const { isOpen, open, close } = useConfirm();
  const { page, rowsPerPage, setPage, handleChangePage } = usePagination();

  const deleteGame = async (gid: string) => {
    const result = await open();
    if (!result) return;
    remove(gid);
  };

  const clickRow = (row: GameResult) => {
    setPage(0); // Paginationをリセット
    navigate(`/dashboard/${id}/${row.name}`);
  };

  return (
    <>
      <TableContainer<Game> columns={columns} align="center" size="small" elevation={1}>
        {gameResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => (
          <GameResultRow
            key={i}
            row={row}
            align="center"
            clickRow={clickRow}
            handleDelete={isDeleted ? deleteGame : undefined}
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
      <GameDeleteConfirm isOpen={isOpen} close={close}></GameDeleteConfirm>
    </>
  );
};

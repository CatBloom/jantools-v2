import { useNavigate } from 'react-router';
import { Column } from '../../types/common';
import { Game, GameResult } from '../../types/game';
import { useGameData } from './hooks/useGameData';
import { GameResultRow } from './components/GameResultRow';
import { GameDeleteConfirm } from './components/GameDeleteConfirm';
import { TableContainer } from '../../components/TableContainer';
import { TablePagination } from '@mui/material';
import { useAtomValue } from 'jotai';
import { gameResultsAtom } from './jotai/gameResultsAtom';
import { useConfirm } from '../../hooks/useConfirm';
import { useLoading } from '../../hooks/useLoading';
import { usePagination } from '../../hooks/usePagination';

export const GameResultTable = (props: {
  leagueID: string;
  name?: string;
  isDeleted?: boolean;
}) => {
  const { leagueID, name, isDeleted } = props;

  const gameResultsAtomValue = useAtomValue(gameResultsAtom);
  // nameがある場合は、参加したゲームの結果のみ表示する
  const gameResults = name
    ? gameResultsAtomValue.filter((game) => game.results.some((result) => result.name === name))
    : gameResultsAtomValue;

  const columns: Column<Game>[] = [
    { key: 'createdAt', display: '登録日' },
    { key: 'results', display: '試合結果' },
  ];
  const { deleteGameData } = useGameData();
  const { isOpen, open, close } = useConfirm();
  const loading = useLoading();
  const { page, rowsPerPage, setPage, handleChangePage } = usePagination();

  const deleteGame = async (gid: string) => {
    const result = await open();
    if (!result) {
      return;
    }

    try {
      loading.start();
      await deleteGameData(gid, leagueID);
    } catch (err) {
      console.error(err);
    } finally {
      loading.finish();
    }
  };

  const navigate = useNavigate();
  const clickRow = (row: GameResult) => {
    setPage(0); // Paginationをリセット
    navigate(`/dashboard/${leagueID}/${row.name}`);
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
        <TablePagination
          count={gameResults.length}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[rowsPerPage]}
          page={page}
          onPageChange={handleChangePage}
        />
      </TableContainer>
      <GameDeleteConfirm isOpen={isOpen} close={close}></GameDeleteConfirm>
    </>
  );
};

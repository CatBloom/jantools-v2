import { TableContainer } from '../../components';
import { Column } from '../../types/common';
import { Game } from '../../types/game';
import { useConfirm, useLoading } from '../../hooks';
import { useGameData } from './hooks/useGameData';
import { GameResultRow } from './components/GameResultRow';
import { GameDeleteConfirm } from './components/GameDeleteConfirm';

export const GameResultTable = (props: {
  leagueID: string;
  games: Game[];
  isDeleted?: boolean;
}) => {
  const { leagueID, games, isDeleted } = props;
  const columns: Column<Game>[] = [
    { key: 'createdAt', display: '登録日' },
    { key: 'results', display: '試合結果' },
  ];
  const { deleteGameData } = useGameData();
  const { isOpen, open, close } = useConfirm();
  const loading = useLoading();

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

  return (
    <>
      <TableContainer<Game> columns={columns} align="center" size="small" elevation={1}>
        {games.map((row, i) =>
          isDeleted ? (
            <GameResultRow key={i} row={row} align="center" handleDelete={deleteGame} />
          ) : (
            <GameResultRow key={i} row={row} align="center" />
          )
        )}
      </TableContainer>
      <GameDeleteConfirm isOpen={isOpen} close={close}></GameDeleteConfirm>
    </>
  );
};

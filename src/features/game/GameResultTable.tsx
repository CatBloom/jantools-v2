import React from 'react';
import { TableContainer } from '../../components';
import { Column } from '../../types/common';
import { Game } from '../../types/game';
import { GameResultRow } from './components/GameResultRow';
import { ConfirmResult } from '../../hooks/useConfirmDialog';
import { useGameData } from './hooks/useGameData';
import { useLoading } from '../../hooks/useLoading';

export const GameResultTable = (props: {
  leagueID: string;
  games: Game[];
  openConfirmDialog: () => Promise<ConfirmResult>;
}) => {
  const { leagueID, games, openConfirmDialog } = props;
  const columns: Column<Game>[] = [
    { key: 'createdAt', display: '登録日' },
    { key: 'results', display: '試合結果' },
  ];
  const { deleteGameData } = useGameData();
  const loading = useLoading();

  const deleteGame = async (gid: string) => {
    const result = await openConfirmDialog();
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
    <TableContainer<Game> columns={columns} align="center" size="small" elevation={1}>
      {games.map((row, i) => (
        <React.Fragment key={i}>
          <GameResultRow row={row} align="center" handleDelete={deleteGame} />
        </React.Fragment>
      ))}
    </TableContainer>
  );
};

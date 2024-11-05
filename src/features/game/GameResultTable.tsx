import React from 'react';
import { TableContainer } from '../../components';
import { Column } from '../../types/common';
import { Game } from '../../types/game';
import { GameResultRow } from './components/GameResultRow';
import { useConfirm } from '../../hooks';
import { useGameData } from './hooks/useGameData';
import { useLoading } from '../../hooks/useLoading';
import { GameDeleteConfirm } from './components/GameDeleteConfirm';

export const GameResultTable = (props: { leagueID: string; games: Game[] }) => {
  const { leagueID, games } = props;
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
        {games.map((row, i) => (
          <React.Fragment key={i}>
            <GameResultRow row={row} align="center" handleDelete={deleteGame} />
          </React.Fragment>
        ))}
      </TableContainer>
      <GameDeleteConfirm open={isOpen} handleModalClose={close}></GameDeleteConfirm>
    </>
  );
};

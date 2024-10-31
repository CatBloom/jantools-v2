import React from 'react';
import { TableContainer } from '../../components';
import { Column } from '../../types/common';
import { Game } from '../../types/game';
import { GameRow } from './components/GameRow';

export const GameResultTable = (props: { games: Game[]; deleteGame: (id: string) => void }) => {
  const { games, deleteGame } = props;
  const columns: Column<Game>[] = [
    { key: 'createdAt', display: '登録日' },
    { key: 'results', display: '試合結果' },
  ];

  return (
    <TableContainer<Game> columns={columns} align="center" size="small" elevation={1}>
      {games.map((row, i) => (
        <React.Fragment key={i}>
          <GameRow row={row} align="center" handleDelete={deleteGame} />
        </React.Fragment>
      ))}
    </TableContainer>
  );
};

import React from 'react';
import { TableContainer } from '../../components';
import { Column } from '../../types/common';
import { GameResultTotal } from '../../types/game';
import { GameTotalRow } from './GameTotalRow';

export const GameTotalTable = (props: { gameResultTotal: GameResultTotal[] }) => {
  const { gameResultTotal } = props;
  const columns: Column<GameResultTotal>[] = [
    { key: 'rank', display: '順位' },
    { key: 'name', display: '名前' },
    { key: 'gameCount', display: '対戦数' },
    { key: 'totalPoint', display: '合計得点' },
    { key: 'averageRank', display: '平均着順' },
  ];

  return (
    <TableContainer<GameResultTotal> columns={columns} align="center" elevation={1}>
      {gameResultTotal.map((row, i) => (
        <React.Fragment key={i}>
          <GameTotalRow row={row} align="center" />
        </React.Fragment>
      ))}
    </TableContainer>
  );
};

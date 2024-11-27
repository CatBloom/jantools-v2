import { useNavigate } from 'react-router';
import { TableContainer } from '../../components';
import { Column } from '../../types/common';
import { GameResultTotal } from '../../types/game';
import { GameTotalRow } from './components/GameTotalRow';
import { useAtomValue } from 'jotai';
import { gameResultTotalAtom } from './jotai';

export const GameTotalTable = (props: { leagueID: string }) => {
  const { leagueID } = props;

  const gameResultTotal = useAtomValue(gameResultTotalAtom);
  const columns: Column<GameResultTotal>[] = [
    { key: 'rank', display: '順位' },
    { key: 'name', display: '名前' },
    { key: 'gameCount', display: '対戦数' },
    { key: 'totalPoint', display: '合計得点' },
    { key: 'averageRank', display: '平均着順' },
  ];

  const navigate = useNavigate();
  const clickRow = (row: GameResultTotal) => {
    navigate(`/dashboard/${leagueID}/${row.name}`);
  };

  return (
    <TableContainer<GameResultTotal> columns={columns} align="center" elevation={1}>
      {gameResultTotal.map((row, i) => (
        <GameTotalRow key={i} row={row} align="center" clickRow={clickRow} />
      ))}
    </TableContainer>
  );
};

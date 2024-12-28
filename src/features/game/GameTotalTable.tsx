import { useNavigate } from 'react-router';
import { Column } from '../../types/common';
import { GameResultTotal } from '../../types/game';
import { GameTotalRow } from './components/GameTotalRow';
import { TableContainer } from '../../components/TableContainer';
import { useGameData } from './hooks/useGameData';

export const GameTotalTable = (props: { leagueID: string }) => {
  const { leagueID } = props;

  const { resultTotalData } = useGameData();
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
      {resultTotalData.map((row, i) => (
        <GameTotalRow key={i} row={row} align="center" clickRow={clickRow} />
      ))}
    </TableContainer>
  );
};

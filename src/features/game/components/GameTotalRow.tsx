import { TableCell, TableCellProps, TableRow } from '@mui/material';
import { GameResultTotal } from '@/types/game';

export const GameTotalRow = (props: {
  row: GameResultTotal;
  align?: TableCellProps['align'];
  clickRow?: (row: GameResultTotal) => void;
}) => {
  const { row, align, clickRow } = props;

  return (
    <TableRow hover onClick={() => clickRow && clickRow(row)}>
      <TableCell align={align}>{row.rank}</TableCell>
      <TableCell align={align}>{row.name}</TableCell>
      <TableCell align={align}>{row.gameCount}</TableCell>
      <TableCell align={align}>{row.totalPoint}</TableCell>
      <TableCell align={align}>{row.averageRank}</TableCell>
    </TableRow>
  );
};

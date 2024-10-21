import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableHead,
  TableRow,
} from '@mui/material';
import { Game } from '../../types/game';
import { dateFormat } from '../../utils/date';

export const GameRow = (props: { row: Game; align?: TableCellProps['align'] }) => {
  const { row, align } = props;

  return (
    <TableRow>
      <TableCell align={align}>{dateFormat(row.createdAt)}</TableCell>
      <TableCell colSpan={4}>
        <Box sx={{ margin: 0 }}>
          <Table size="small" aria-label="purchases">
            <TableHead>
              <TableRow>
                <TableCell component="th" scope="row">
                  順位
                </TableCell>
                <TableCell align="right">名前</TableCell>
                <TableCell align="right">点数</TableCell>
                <TableCell align="right">点数</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {row.results.map((resultRow) => (
                <TableRow key={resultRow.rank}>
                  <TableCell>{resultRow.rank}</TableCell>
                  <TableCell align="right">{resultRow.name}</TableCell>
                  <TableCell align="right">{resultRow.point}</TableCell>
                  <TableCell align="right">{resultRow.calcPoint}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </TableCell>
    </TableRow>
  );
};

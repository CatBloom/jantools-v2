import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableHead,
  TableRow,
} from '@mui/material';
import { Game } from '../../types/game';
import { dateFormat } from '../../utils/date';

export const GameRow = (props: {
  row: Game;
  align?: TableCellProps['align'];
  handleDelete: (id: string) => void;
}) => {
  const { row, align, handleDelete } = props;

  return (
    <TableRow>
      <TableCell align={align}>
        <IconButton
          size="small"
          sx={(theme) => ({
            color: theme.palette.error.main,
          })}
          onClick={() => handleDelete(row.id)}
        >
          ✖︎
        </IconButton>
        {dateFormat(row.createdAt)}{' '}
      </TableCell>
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

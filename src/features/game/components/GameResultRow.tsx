import { Box, IconButton, TableCell, TableCellProps, TableRow } from '@mui/material';
import { TableContainer } from '@/components/TableContainer';
import { Column } from '@/types/common';
import { Game, GameResult } from '@/types/game';
import { dateFormat } from '@/utils/date';

export const GameResultRow = (props: {
  row: Game;
  align?: TableCellProps['align'];
  clickRow?: (row: GameResult) => void;
  handleDelete?: (id: string) => void;
}) => {
  const { row, align, clickRow, handleDelete } = props;

  const resultColumns: Column<GameResult>[] = [
    { key: 'rank', display: '順位' },
    { key: 'name', display: '名前' },
    { key: 'point', display: '点数' },
    { key: 'calcPoint', display: '順位点' },
  ];

  return (
    <TableRow>
      <TableCell align={align}>
        {handleDelete && (
          <IconButton
            size="small"
            sx={(theme) => ({
              color: theme.palette.error.main,
            })}
            onClick={() => handleDelete(row.id)}
          >
            ✖︎
          </IconButton>
        )}
        {dateFormat(row.createdAt)}{' '}
      </TableCell>
      <TableCell colSpan={4}>
        <Box sx={{ margin: 0 }}>
          <TableContainer<GameResult> columns={resultColumns} align={align} size="small">
            {row.results.map((resultRow) => (
              <TableRow
                key={resultRow.name}
                hover={!!clickRow}
                onClick={clickRow ? () => clickRow(resultRow) : undefined}
              >
                <TableCell align={align}>{resultRow.rank}</TableCell>
                <TableCell align={align}>{resultRow.name}</TableCell>
                <TableCell align={align}>{resultRow.point}</TableCell>
                <TableCell align={align}>{resultRow.calcPoint}</TableCell>
              </TableRow>
            ))}
          </TableContainer>
        </Box>
      </TableCell>
    </TableRow>
  );
};

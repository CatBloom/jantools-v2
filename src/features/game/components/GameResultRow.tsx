import { Box, TableCell, TableCellProps, TableRow } from '@mui/material';
import { TableContainer } from '@/components/TableContainer';
import { Column } from '@/types/common';
import { Game, GameResult } from '@/types/game';
import { dateFormat } from '@/utils/date';
import { LeagueRule } from '@/types/league';
import { useDisclosure } from '@/hooks/useDisclosure';
import { GameEditor } from './GameEditor';

export const GameResultRow = (props: {
  row: Game;
  align?: TableCellProps['align'];
  clickRow?: (row: GameResult) => void;
  isEdit?: boolean;
  rule?: LeagueRule;
}) => {
  const { row, align, clickRow, isEdit, rule } = props;

  const resultColumns: Column<GameResult>[] = [
    { key: 'rank', display: '順位' },
    { key: 'name', display: '名前' },
    { key: 'point', display: '点数' },
    { key: 'calcPoint', display: '順位点' },
  ];

  const { isOpen, open, close } = useDisclosure();

  return (
    <>
      <TableRow
        hover={isEdit}
        onClick={() => isEdit && open()}
        sx={{ cursor: isEdit ? 'pointer' : 'default' }}
      >
        <TableCell align="center">{dateFormat(row.gameDate)}</TableCell>
        <TableCell>
          <Box sx={{ margin: 0 }}>
            <TableContainer<GameResult> columns={resultColumns} align={align} size="small">
              {row.results.map((resultRow) => (
                <TableRow
                  key={resultRow.name}
                  hover={!!clickRow}
                  onClick={clickRow ? () => clickRow(resultRow) : undefined}
                  sx={{ cursor: 'pointer' }}
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
      {rule && <GameEditor gameID={row.id} rule={rule} isOpen={isOpen} close={close}></GameEditor>}
    </>
  );
};

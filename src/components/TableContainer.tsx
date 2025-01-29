import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableCellProps,
  TableOwnProps,
} from '@mui/material';
import MUITabelContainer from '@mui/material/TableContainer';
import { Column } from '@/types/common';

export const TableContainer = <T,>(props: {
  columns: Column<T>[];
  size?: TableOwnProps['size'];
  align?: TableCellProps['align'];
  elevation?: number;
  children: React.ReactNode;
}) => {
  const { size, elevation, columns, align, children } = props;

  return (
    <MUITabelContainer component={elevation ? Paper : 'div'} elevation={elevation}>
      <Table size={size}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell align={align} key={column.key} sx={{ minWidth: '6rem' }}>
                {column.display}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </MUITabelContainer>
  );
};

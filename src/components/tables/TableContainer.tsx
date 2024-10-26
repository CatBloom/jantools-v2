import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  TableCellProps,
} from '@mui/material';
import MUITabelContainer from '@mui/material/TableContainer';

import { Column } from '../../types/common';

export const TableContainer = <T,>(props: {
  columns: Column<T>[];
  align?: TableCellProps['align'];
  order?: 'asc' | 'desc';
  orderBy?: keyof T | null;
  children: React.ReactNode;
  handleSort?: (column: keyof T) => void;
}) => {
  const { order, orderBy, columns, align, children, handleSort } = props;

  return (
    <MUITabelContainer component={Paper} elevation={1}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell align={align} key={column.key as string}>
                {handleSort ? (
                  <TableSortLabel
                    sx={{ minWidth: '4rem' }}
                    active={orderBy === column.key}
                    direction={orderBy === column.key ? order : 'asc'}
                    onClick={() => handleSort(column.key)}
                  >
                    {column.display}
                  </TableSortLabel>
                ) : (
                  column.display
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </MUITabelContainer>
  );
};

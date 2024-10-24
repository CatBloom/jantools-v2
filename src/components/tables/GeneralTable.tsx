import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  TableCellProps,
} from '@mui/material';
import { Column } from '../../types/common';

export const GeneralTable = <T,>(props: {
  rows: T[];
  columns: Column<T>[];
  align?: TableCellProps['align'];
  RowComponent: (props: { row: T; align?: TableCellProps['align'] }) => React.ReactElement;
}) => {
  const { rows, columns, align, RowComponent } = props;

  const [orderBy, setOrderBy] = useState<keyof T | null>(null);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [sortedRows, setSortedRows] = useState<T[]>(rows);

  useEffect(() => {
    setSortedRows(rows);
  }, [rows]);

  const handleSort = (column: keyof T) => {
    const isAsc = orderBy === column && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(column);

    const sorted = [...rows].sort((a, b) => {
      const aData = a[column];
      const bData = b[column];

      if (aData < bData) return isAsc ? 1 : -1;
      if (aData > bData) return isAsc ? -1 : 1;
      return 0;
    });
    setSortedRows(sorted);
  };
  return (
    <TableContainer component={Paper} elevation={1}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell align={align} key={column.key as string}>
                <TableSortLabel
                  sx={{ minWidth: '4rem' }}
                  active={orderBy === column.key}
                  direction={orderBy === column.key ? order : 'asc'}
                  onClick={() => handleSort(column.key)}
                >
                  {column.display}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRows.map((row, index) => (
            <RowComponent key={index} row={row} align={align} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

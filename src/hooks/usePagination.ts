import { useCallback, useState } from 'react';

export const usePagination = (initialRowsPerPage: number = 5) => {
  const [page, setPage] = useState(0);

  // デフォルトは5
  const rowsPerPage = initialRowsPerPage;

  const handleChangePage = useCallback(
    (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage);
    },
    []
  );

  return { page, rowsPerPage, setPage, handleChangePage };
};

import { useState, useEffect } from 'react';

type ConfirmResult = 'confirm' | undefined;

export const useConfirmDialog = () => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [resolve, setResolve] = useState<(value?: ConfirmResult) => void>();

  useEffect(() => {
    return () => {
      if (resolve) {
        resolve();
      }
    };
  }, [resolve]);

  const openConfirmDialog = () => {
    setConfirmOpen(true);
    return new Promise<ConfirmResult>((res) => {
      setResolve(() => res);
    });
  };

  const closeConfirmDialog = (result?: ConfirmResult) => {
    setConfirmOpen(false);
    setResolve(undefined);
    if (resolve) {
      resolve(result);
    }
  };

  return {
    confirmOpen,
    openConfirmDialog,
    closeConfirmDialog,
  };
};

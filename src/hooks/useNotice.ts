import { atom, useAtom } from 'jotai';
import { AlertColor } from '@mui/material';
import { useCallback } from 'react';

interface Notice {
  message?: string;
  severity: AlertColor; // "success" | "info" | "warning" | "error"
}

const noticeAtom = atom<Notice | null>(null);

export const useNotice = () => {
  const [notice, setNotice] = useAtom(noticeAtom);
  const defaultMessage = 'エラーが発生しました。しばらくしてからもう一度お試しください。';

  const set = useCallback(
    (notice: Notice) => {
      setNotice({
        message: notice.message ?? defaultMessage,
        severity: notice.severity,
      });
    },
    [setNotice]
  );

  const clear = useCallback(() => {
    setNotice(null);
  }, [setNotice]);

  return { notice, set, clear };
};

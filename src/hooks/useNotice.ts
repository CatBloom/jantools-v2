import { atom, useAtom } from 'jotai';
import { AlertColor } from '@mui/material';
import { useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

interface Notice {
  message?: string;
  severity: AlertColor; // "success" | "info" | "warning" | "error"
}

const noticeAtom = atom<Notice | null>(null);

export const useNotice = () => {
  const [notice, setNotice] = useAtom(noticeAtom);
  const location = useLocation();
  const prevPathnameRef = useRef(location.pathname);

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

  // pathが変わった際に、通知を消す
  useEffect(() => {
    if (prevPathnameRef.current !== location.pathname) {
      clear();
      prevPathnameRef.current = location.pathname;
    }
  }, [location.pathname]);

  return { notice, set, clear };
};

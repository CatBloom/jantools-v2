import { useCallback, useEffect, useRef, useState } from 'react';
import { useNotice } from '@/hooks/useNotice';
import { useLocation } from 'react-router';

export const useEditMode = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { set } = useNotice();
  const location = useLocation();
  const prevPathnameRef = useRef(location.pathname);

  const toggle = useCallback(() => {
    setIsEdit((prev) => {
      const next = !prev;
      set({
        message: next ? '編集モードに切り替えました。' : '編集モードを解除しました。',
        severity: 'info',
      });
      return next;
    });
  }, [set]);

  // pathが変わった際に、editModeを解除する
  useEffect(() => {
    if (prevPathnameRef.current !== location.pathname) {
      setIsEdit(false);
      prevPathnameRef.current = location.pathname;
    }
  }, [location.pathname]);

  return { isEdit, setIsEdit, toggle };
};

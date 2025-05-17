import { useCallback, useState } from 'react';
import { useNotice } from '@/hooks/useNotice';

export const useEditMode = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { set } = useNotice();

  const toggle = useCallback(() => {
    setIsEdit((prev) => {
      const next = !prev;
      set({
        message: next ? '編集モードに切り替えました。' : '編集モードを解除しました。',
        severity: 'info',
      });
      return next;
    });
  }, []);

  return { isEdit, setIsEdit, toggle };
};

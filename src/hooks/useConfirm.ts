import { useState, useCallback, useRef, useEffect } from 'react';

export type ConfirmResult = 'confirm' | undefined;

export const useConfirm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const resolveRef = useRef<(value?: ConfirmResult) => void>();

  useEffect(() => {
    return () => {
      if (resolveRef.current) {
        resolveRef.current();
      }
    };
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
    return new Promise<ConfirmResult>((resolve) => {
      resolveRef.current = resolve;
    });
  }, []);

  const close = useCallback((result?: ConfirmResult) => {
    setIsOpen(false);
    if (resolveRef.current) {
      resolveRef.current(result);
      resolveRef.current = undefined;
    }
  }, []);

  return { isOpen, open, close };
};

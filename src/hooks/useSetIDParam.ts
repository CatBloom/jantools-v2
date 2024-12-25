import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router';
import { useSetAtom } from 'jotai';
import { paramWithIDAtom } from '../jotai/paramsAtom';

export const useSetIDParam = () => {
  const { id } = useParams();
  const loaction = useLocation();
  const setParamWithID = useSetAtom(paramWithIDAtom);

  // 現在と前回のIDを保管。location変更時にトリガーする
  useEffect(() => {
    setParamWithID(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaction.pathname]);

  return { id };
};

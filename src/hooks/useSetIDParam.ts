import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAtom, useSetAtom } from 'jotai';
import { paramWithIDAtom, prevParamWithIDAtom } from '../jotai/paramsAtom';
import { useLocation } from 'react-router-dom';

export const useSetIDParam = () => {
  const { id } = useParams();
  const loaction = useLocation();
  const [paramWithID, setParamWithID] = useAtom(paramWithIDAtom);
  const setPrevID = useSetAtom(prevParamWithIDAtom);

  // 現在と前回のIDを保管。location変更時にトリガーする
  useEffect(() => {
    setPrevID(paramWithID);
    setParamWithID(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaction.pathname]);

  return { id };
};

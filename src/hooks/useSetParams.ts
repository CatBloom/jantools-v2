import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { paramWithIDAtom } from '../jotai/paramsAtom';

export const useSetParams = () => {
  const { id } = useParams();
  const setParamWithID = useSetAtom(paramWithIDAtom);

  useEffect(() => {
    if (id) setParamWithID(id);
  }, [id, setParamWithID]);

  return { id };
};

import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useSetAtom } from 'jotai';
import { paramWithIDAtom } from '../jotai/paramsAtom';

export const useSetIDParam = () => {
  const { id } = useParams();
  const setParamWithID = useSetAtom(paramWithIDAtom);

  useEffect(() => {
    setParamWithID(id);
  }, [id, setParamWithID]);
};

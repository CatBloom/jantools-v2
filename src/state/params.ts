import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useSetAtom, atom } from 'jotai';

const paramWithIDAtom = atom<string | undefined>(undefined);
// 公開用、変更をトリガーにfetchを行う
export const readonlyParamWithIDAtom = atom((get) => get(paramWithIDAtom));

// param変更時にstateを更新するヘルパー関数
// AppLayoutでのみ呼ばれる
export const useSetIDParam = () => {
  const { id } = useParams();
  const setParamWithID = useSetAtom(paramWithIDAtom);

  useEffect(() => {
    setParamWithID(id);
  }, [id, setParamWithID]);
};

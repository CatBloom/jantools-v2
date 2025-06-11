import { atom } from 'jotai';
import { gameListFetcher } from '../api/gameListFetcher';

export const gameResultDescAtom = atom(async (get) => {
  const gameList = await get(gameListFetcher);
  if (!gameList) return [];

  return [...gameList].sort((a, b) => {
    // 試合日は、重複する可能性があるため
    // 重複した場合は、作成日でソートする
    const dateCompare = b.gameDate.localeCompare(a.gameDate);
    if (dateCompare !== 0) {
      return dateCompare;
    }
    return b.createdAt.localeCompare(a.createdAt);
  });
});

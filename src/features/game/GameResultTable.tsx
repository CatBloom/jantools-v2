import React from 'react';
import { TableContainer } from '../../components';
import { Column } from '../../types/common';
import { Game } from '../../types/game';
import { GameResultRow } from './components/GameResultRow';
import { ConfirmResult } from '../../hooks/useConfirmDialog';
import { useGameData } from './hooks/useGameData';
import { useSetRecoilState } from 'recoil';
import { loadingAtom } from '../../recoil/atoms';

export const GameResultTable = (props: {
  games: Game[];
  leagueID?: string;
  openConfirmDialog: () => Promise<ConfirmResult>;
}) => {
  const { games, leagueID, openConfirmDialog } = props;
  const columns: Column<Game>[] = [
    { key: 'createdAt', display: '登録日' },
    { key: 'results', display: '試合結果' },
  ];
  const { deleteGameData } = useGameData();
  const setLoading = useSetRecoilState(loadingAtom);

  const deleteGame = async (gid: string) => {
    if (!leagueID) {
      return;
    }

    const result = await openConfirmDialog();
    if (!result) {
      return;
    }

    setLoading(true);
    try {
      await deleteGameData(gid, leagueID);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TableContainer<Game> columns={columns} align="center" size="small" elevation={1}>
      {games.map((row, i) => (
        <React.Fragment key={i}>
          <GameResultRow row={row} align="center" handleDelete={deleteGame} />
        </React.Fragment>
      ))}
    </TableContainer>
  );
};

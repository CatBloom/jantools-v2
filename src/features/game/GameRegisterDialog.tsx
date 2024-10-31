import { useGameData } from './hooks/useGameData';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { loadingAtom } from '../../recoil/atoms';
import { gamePlayerSelector } from '../../recoil/selectors';
import { ReqCreateGame } from '../../types/game';
import { ModalContainer } from '../../components';
import { GameForm } from './components/GameForm';
import { LeagueRule } from '../../types/league';
import { GameFormData } from './types/form';

export const GameRegisterDialog = (props: {
  leagueID?: string;
  rule: LeagueRule;
  open: boolean;
  handleModalClose: () => void;
}) => {
  const { leagueID, rule, open, handleModalClose } = props;
  const { createGameData } = useGameData();
  const setLoading = useSetRecoilState(loadingAtom);
  const gamePlayers = useRecoilValue(gamePlayerSelector);

  const submit = async (formdata: GameFormData) => {
    if (!leagueID) {
      return;
    }
    const req: ReqCreateGame = { ...formdata, leagueID: leagueID };

    setLoading(true);
    try {
      await createGameData(req);
      handleModalClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalContainer modalTitle="成績登録" open={open} onClose={handleModalClose}>
      <GameForm rule={rule} gamePlayers={gamePlayers} submit={submit} />
    </ModalContainer>
  );
};

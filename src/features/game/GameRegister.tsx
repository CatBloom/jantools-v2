import { useGameData } from './hooks/useGameData';
import { useRecoilValue } from 'recoil';
import { gamePlayerSelector } from '../../recoil/selectors';
import { ReqCreateGame } from '../../types/game';
import { ModalContainer } from '../../components';
import { GameForm } from './components/GameForm';
import { LeagueRule } from '../../types/league';
import { GameFormData } from './types/form';
import { useLoading } from '../../hooks/useLoading';

export const GameRegister = (props: {
  leagueID: string;
  rule: LeagueRule;
  isOpen: boolean;
  close: () => void;
}) => {
  const { leagueID, rule, isOpen, close } = props;
  const { createGameData } = useGameData();
  const loading = useLoading();
  const gamePlayers = useRecoilValue(gamePlayerSelector);

  const submit = async (formdata: GameFormData) => {
    const req: ReqCreateGame = { ...formdata, leagueID: leagueID };

    try {
      loading.start();
      await createGameData(req);
      close();
    } catch (err) {
      console.error(err);
    } finally {
      loading.finish();
    }
  };

  return (
    <ModalContainer modalTitle="成績登録" isOpen={isOpen} close={close}>
      <GameForm rule={rule} gamePlayers={gamePlayers} submit={submit} />
    </ModalContainer>
  );
};

import { GameForm } from './components/GameForm';
import { ModalContainer } from '../../components/ModalContainer';
import { LeagueRule } from '../../types/league';
import { ReqCreateGame } from '../../types/game';
import { GameFormData } from './types/form';
import { useGameData } from './hooks/useGameData';
import { useLoading } from '../../hooks/useLoading';

export const GameRegister = (props: {
  leagueID: string;
  rule: LeagueRule;
  isOpen: boolean;
  close: () => void;
}) => {
  const { leagueID, rule, isOpen, close } = props;
  const { createGameData, playersData } = useGameData();
  const loading = useLoading();

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
      <GameForm rule={rule} gamePlayers={playersData} submit={submit} />
    </ModalContainer>
  );
};

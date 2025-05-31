import { ModalContainer } from '@/components/ModalContainer';
import { LeagueRule } from '@/types/league';
import { GameFormData } from '@/types/game';
import { GameForm } from './GameForm';
import { useGameData } from '../hooks/useGameData';
import { useGame } from '../hooks/useGame';

export const GameRegister = (props: { rule: LeagueRule; isOpen: boolean; close: () => void }) => {
  const { rule, isOpen, close } = props;

  const { playersData } = useGameData();
  const { create } = useGame();

  const submit = (formData: GameFormData) => {
    create(formData);
    close();
  };

  return (
    <ModalContainer modalTitle="成績登録" isOpen={isOpen} close={close}>
      <GameForm rule={rule} gamePlayers={playersData} submit={submit} />
    </ModalContainer>
  );
};

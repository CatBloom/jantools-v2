import { ModalContainer } from '@/components/ModalContainer';
import { LeagueRule } from '@/types/league';
import { GameFormData } from '@/types/game';
import { GameForm } from './components/GameForm';
import { useGameData } from './hooks/useGameData';
import { useGame } from './hooks/useGame';
import { useConfirm } from '@/hooks/useConfirm';
import { GameDeleteConfirm } from './components/GameDeleteConfirm';

export const GameEditor = (props: {
  id: string;
  rule: LeagueRule;
  isOpen: boolean;
  close: () => void;
}) => {
  const { id, rule, isOpen, close } = props;

  const confirm = useConfirm();
  const { update, remove } = useGame();
  const { playersData, resultDescData } = useGameData();

  const data = resultDescData.find((result) => result.id === id);
  if (!data) return null;

  const submit = (formData: GameFormData) => {
    update(data, formData);
    close();
  };

  const deleteGame = async () => {
    const result = await confirm.open();
    if (!result) return;
    remove(id);
    close();
  };

  return (
    <>
      <ModalContainer modalTitle="成績編集" isOpen={isOpen} close={close}>
        <GameForm
          rule={rule}
          data={data}
          handleDelete={deleteGame}
          gamePlayers={playersData}
          submit={submit}
        />
      </ModalContainer>
      <GameDeleteConfirm isOpen={confirm.isOpen} close={confirm.close}></GameDeleteConfirm>
    </>
  );
};

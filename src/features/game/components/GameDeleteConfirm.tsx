import { Button } from '@mui/material';
import { ConfirmResult } from '../../../hooks/useConfirm';
import { ModalContainer } from '../../../components/ModalContainer';

export const GameDeleteConfirm = (props: {
  isOpen: boolean;
  close: (result?: ConfirmResult) => void;
}) => {
  const { isOpen, close } = props;

  return (
    <ModalContainer modalTitle="成績削除" isOpen={isOpen} close={() => close()}>
      <Button variant="contained" color="error" onClick={() => close('confirm')}>
        削除
      </Button>
    </ModalContainer>
  );
};

import { ModalContainer } from '../../../components';
import { Button } from '@mui/material';
import { ConfirmResult } from '../../../hooks/useConfirmDialog';

export const GameDeleteConfirm = (props: {
  open: boolean;
  handleModalClose: (result?: ConfirmResult) => void;
}) => {
  const { open, handleModalClose } = props;

  return (
    <ModalContainer modalTitle="成績削除" open={open} onClose={() => handleModalClose()}>
      <Button variant="contained" color="error" onClick={() => handleModalClose('confirm')}>
        削除
      </Button>
    </ModalContainer>
  );
};

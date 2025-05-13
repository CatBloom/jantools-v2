import { Button, Stack, Typography } from '@mui/material';
import { ConfirmResult } from '@/hooks/useConfirm';
import { ModalContainer } from '@/components/ModalContainer';

export const GameDeleteConfirm = (props: {
  isOpen: boolean;
  close: (result?: ConfirmResult) => void;
}) => {
  const { isOpen, close } = props;

  return (
    <ModalContainer modalTitle="成績削除" isOpen={isOpen} close={() => close()}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap">
        <Typography component="p">本当に削除してもよろしいですか？</Typography>
        <Button variant="contained" color="error" onClick={() => close('confirm')}>
          削除
        </Button>
      </Stack>
    </ModalContainer>
  );
};

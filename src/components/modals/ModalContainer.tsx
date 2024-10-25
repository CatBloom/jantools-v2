import { Button, Container, Stack, Typography, Modal } from '@mui/material';

export const ModalContainer = (props: {
  modalTitle: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  const { modalTitle, open, children, onClose } = props;

  return (
    <Modal open={open}>
      <Container
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          p: 2,
        }}
        maxWidth="sm"
      >
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h3">{modalTitle}</Typography>
            <Button
              variant="text"
              sx={(theme) => ({
                color: theme.palette.error.main,
              })}
              onClick={onClose}
            >
              ✖︎
            </Button>
          </Stack>
          {children}
        </Stack>
      </Container>
    </Modal>
  );
};

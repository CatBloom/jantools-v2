import { Container, Stack, Typography, Modal, IconButton } from '@mui/material';

export const ModalContainer = (props: {
  modalTitle: string;
  isOpen: boolean;
  close: () => void;
  children: React.ReactNode;
}) => {
  const { modalTitle, isOpen, children, close } = props;

  return (
    <Modal open={isOpen}>
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
            <IconButton
              size="small"
              sx={(theme) => ({
                color: theme.palette.error.main,
              })}
              onClick={close}
            >
              ✖︎
            </IconButton>
          </Stack>
          {children}
        </Stack>
      </Container>
    </Modal>
  );
};

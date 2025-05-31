import { Container, Stack, Typography } from '@mui/material';
import { isAxiosError } from 'axios';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router';

export const Error = () => {
  const error = useRouteError();

  const renderErrorContent = (title: string) => {
    return (
      <Container>
        <Stack spacing={2} p="2rem">
          <Typography variant="h1" component="h1">
            {title}
          </Typography>
          <Typography variant="body1" component="p">
            エラーが発生しました。
          </Typography>
          <Typography
            variant="body1"
            component={Link}
            to="/"
            sx={(theme) => ({ color: theme.palette.text.primary })}
          >
            TOPへ戻る
          </Typography>
        </Stack>
      </Container>
    );
  };

  switch (true) {
    case isRouteErrorResponse(error):
      console.error(error.data?.message);
      return renderErrorContent(`${error.status} ${error.statusText}`);
    case isAxiosError(error):
      console.error(error.message);
      return renderErrorContent(`${error.status} ${error.response?.statusText}`);
    default:
      return renderErrorContent('error');
  }
};

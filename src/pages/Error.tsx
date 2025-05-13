import { Container, Stack, Typography } from '@mui/material';
import { isAxiosError } from 'axios';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router';

export const Error = () => {
  const error = useRouteError();

  const renderErrorContent = (title: string, message?: string) => {
    return (
      <Container>
        <Stack spacing={2} p="2rem">
          <Typography variant="h1" component="h1">
            {title}
          </Typography>
          {message && (
            <Typography variant="body1" component="p">
              {message}
            </Typography>
          )}
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
      return renderErrorContent(`${error.status} ${error.statusText}`, error.data?.message);
    case isAxiosError(error):
      return renderErrorContent(`${error.status} ${error.response?.statusText}`, error.message);
    default:
      return renderErrorContent('error');
  }
};

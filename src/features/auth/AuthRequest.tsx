import { useState } from 'react';
import { PasswordInput } from '@/components/PasswordInput';
import { Button, Stack } from '@mui/material';
import { useAuth } from './hooks/useAuth';

export const AuthRequest = () => {
  const [password, setPassword] = useState('');

  const { create } = useAuth();

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <Stack direction="row" spacing={1} component="form">
      <PasswordInput value={password} onChange={handlePasswordChange} />
      <Button
        sx={{ minWidth: '6.5rem' }}
        variant="contained"
        color="secondary"
        onClick={() => {
          create(password);
        }}
      >
        リクエスト
      </Button>
    </Stack>
  );
};

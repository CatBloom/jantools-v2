import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

export default function LeagueForm() {
  return (
    <>
      <Stack component="form" sx={{ width: '100%' }} spacing={1}>
        <h2>大会登録</h2>
        <TextField required fullWidth id="outlined-required" label="大会名" />
        <TextField fullWidth id="outlined-multiline-static" label="説明" multiline rows={4} />
      </Stack>
    </>
  );
}

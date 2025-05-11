import { useState } from 'react';
import { IconVisibility, IIconVisibilityOff } from '@/components/icons/IconVisibility';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
} from '@mui/material';

export const PasswordInput = (props: {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
}) => {
  const { value, onChange, error, helperText } = props;
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword((show) => !show);

  return (
    <Stack direction="row" spacing={1}>
      <FormControl sx={{ width: '100%' }} error={error}>
        {/* password inputだけでは、警告が出るためダミーでusername inputを置く */}
        <input
          type="text"
          name="username"
          autoComplete="username"
          value="dummy"
          style={{ display: 'none' }}
          readOnly
          tabIndex={-1}
        />
        <InputLabel htmlFor="password">パスワード</InputLabel>
        <OutlinedInput
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleShowPassword} edge="end">
                {showPassword ? <IIconVisibilityOff /> : <IconVisibility />}
              </IconButton>
            </InputAdornment>
          }
          label="パスワード"
          autoComplete="new-password"
        />
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </Stack>
  );
};

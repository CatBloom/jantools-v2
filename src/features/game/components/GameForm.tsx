import { useState } from 'react';
import { LeagueRule } from '../../../types/league';
import { Stack, TextField, Button, Autocomplete, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { FormData, GameFormData } from '../types/form';

export const GameForm = (props: {
  rule: LeagueRule;
  gamePlayers: string[];
  submit: (formdata: GameFormData) => void;
}) => {
  const { rule, gamePlayers, submit } = props;

  const [validateErorrMsg, setValidateErrorMsg] = useState('');
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<FormData>({
    defaultValues: {
      gameArray: Array.from({ length: rule.playerCount }, (_, i) => ({
        rank: String(i + 1),
        name: '',
        point: '',
        calcPoint: '',
      })),
    },
  });

  const validation = {
    name: {
      required: '必須項目です。',
    },
    point: {
      required: '必須項目です',
      minLength: { value: 4, message: '4桁以上で入力してください。' },
    },
  };

  const validateFormData = (formData: FormData) => {
    const { gameArray } = formData;
    const { startPoint, playerCount } = rule;
    const totalPoint = gameArray.map((v) => Number(v.point)).reduce((prev, curr) => prev + curr, 0);
    const players = gameArray.map((v) => v.name);
    const uniquePlayers = new Set(players);

    if (uniquePlayers.size !== players.length) {
      setValidateErrorMsg('プレイヤーが重複しています。');
      return false;
    }

    if (totalPoint !== startPoint * playerCount) {
      setValidateErrorMsg('合計点数が不一致です。');
      return false;
    }

    return true;
  };

  const calculatePoint = (point: number, i: number) => {
    const { returnPoint, startPoint, playerCount, uma } = rule;

    const topPrize = (returnPoint - startPoint) * playerCount;
    const calcPoint = point - returnPoint + uma[i] * 1000;
    // 1位の場合はTOP賞を加算
    if (i === 0) {
      return Math.floor(((calcPoint + topPrize) / 1000) * 10) / 10;
    } else {
      return Math.floor((calcPoint / 1000) * 10) / 10;
    }
  };

  const handleAutoCalcPoint = (i: number, value: string) => {
    const pointValue = Number(value);
    if (pointValue === 0) {
      setValue(`gameArray.${i}.point`, '');
      setValue(`gameArray.${i}.calcPoint`, '');
      return;
    }
    const calcPoint = calculatePoint(pointValue, i);
    setValue(`gameArray.${i}.point`, String(pointValue));
    setValue(`gameArray.${i}.calcPoint`, String(calcPoint));
  };

  // 送信時の処理
  const handleSubmitForm: SubmitHandler<FormData> = async (formData) => {
    if (!validateFormData(formData)) {
      return;
    }

    // FormDataをAPI用のデータに加工
    const gameFormData: GameFormData = {
      results: formData.gameArray.map((v) => {
        return {
          rank: Number(v.rank),
          name: v.name,
          point: Number(v.point),
          calcPoint: Number(v.calcPoint),
        };
      }),
    };
    submit(gameFormData);
  };
  return (
    <>
      <Stack
        component="form"
        spacing={1}
        sx={{ width: '100%' }}
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        {getValues('gameArray').map((_, i) => (
          <Stack spacing={1} key={i}>
            <Grid container spacing={1}>
              <Grid size={1} sx={{ minWidth: '4rem' }}>
                <Controller
                  name={`gameArray.${i}.rank`}
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} required label="順位" type="number" disabled />
                  )}
                />
              </Grid>
              <Grid size="grow">
                <Controller
                  name={`gameArray.${i}.name`}
                  control={control}
                  rules={validation.name}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      freeSolo
                      options={gamePlayers ? gamePlayers : []}
                      onChange={(_, data) => field.onChange(data || '')}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          fullWidth
                          label="名前"
                          type="string"
                          onChange={(e) => field.onChange(e)}
                          error={!!errors.gameArray?.[i]?.name}
                        />
                      )}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid container spacing={1}>
              <Grid size="grow">
                <Controller
                  name={`gameArray.${i}.point`}
                  control={control}
                  rules={validation.point}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      required
                      label="点数"
                      type="number"
                      onChange={(e) => {
                        handleAutoCalcPoint(i, e.target.value);
                        field.onChange(e);
                      }}
                      error={errors.gameArray?.[i]?.point !== undefined}
                      helperText={errors.gameArray?.[i]?.point?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={2} sx={{ minWidth: '5rem' }}>
                <Controller
                  name={`gameArray.${i}.calcPoint`}
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} required label="順位点" disabled type="number" />
                  )}
                />
              </Grid>
            </Grid>
          </Stack>
        ))}
        <Typography component="p" color="error">
          {validateErorrMsg}
        </Typography>
        <Button variant="contained" type="submit" color="secondary">
          送信
        </Button>
      </Stack>
    </>
  );
};

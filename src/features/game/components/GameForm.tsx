import { useState } from 'react';
import {
  Stack,
  TextField,
  Button,
  Autocomplete,
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
  MenuItem,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { LeagueRule } from '@/types/league';
import { GameFormData } from '@/types/game';

interface FormData {
  gameArray: FormDataGameResult[];
}

interface FormDataGameResult {
  rank: string;
  name: string;
  point: string;
  calcPoint: string;
}

export const GameForm = (props: {
  rule: LeagueRule;
  gamePlayers: string[];
  submit: (formdata: GameFormData) => void;
}) => {
  const { rule, gamePlayers, submit } = props;

  const [autoCalc, setAutoCalc] = useState(true);
  const [validateErorrMsg, setValidateErrorMsg] = useState('');
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
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
    rank: {
      required: '必須項目です',
    },
    name: {
      required: '必須項目です。',
    },
    point: {
      required: '必須項目です',
      validate: (value: string) => {
        if (value === '0') return true; // "0"はスルー
        if (/^\d{3,}$/.test(value)) return true; // 100以上の正の数を許可
        if (/^-\d{3,}$/.test(value)) return true; // -100以下の負の数を許可
        return '0 または、3桁以上の数値を入力してください。';
      },
    },
    calcPoint: {
      required: '必須項目です',
    },
  };

  const validateFormData = (formData: FormData) => {
    const { gameArray } = formData;
    const { startPoint, playerCount } = rule;
    const totalPoint = gameArray.map((v) => Number(v.point)).reduce((prev, curr) => prev + curr, 0);
    const totalCalcPoint = gameArray
      .map((v) => Number(v.calcPoint) * 10) // calcPointは少数の可能性があるため、浮動小数点対策
      .reduce((prev, curr) => prev + curr, 0);
    const players = gameArray.map((v) => v.name);
    const uniquePlayers = new Set(players);
    const ranks = gameArray.map((v) => Number(v.rank));
    const points = gameArray.map((v) => Number(v.point));

    // ランクは昇順で入力
    if (!isArraySorted(ranks, true)) {
      setValidateErrorMsg('順位に不正があります。');
      return false;
    }
    // 点数は降順で入力
    if (!isArraySorted(points, false)) {
      setValidateErrorMsg('点数に不正があります。');
      return false;
    }
    if (uniquePlayers.size !== players.length) {
      setValidateErrorMsg('プレイヤーが重複しています。');
      return false;
    }
    if (totalPoint !== startPoint * playerCount) {
      setValidateErrorMsg('合計点数が不一致です。');
      return false;
    }
    if (totalCalcPoint !== 0) {
      setValidateErrorMsg('合計順位点が不一致です。');
      return false;
    }
    return true;
  };

  // 配列が正しい順番か判別する
  const isArraySorted = <T extends number | string>(arr: T[], asc: boolean): boolean => {
    if (asc) {
      return arr.every((value, index, array) => {
        return index === 0 || array[index - 1] <= value;
      });
    } else {
      return arr.every((value, index, array) => {
        return index === 0 || array[index - 1] >= value;
      });
    }
  };

  const calculatePoint = (point: number, i: number) => {
    const { returnPoint, startPoint, playerCount, uma } = rule;
    const calcPoint = point - returnPoint + uma[i] * 1000;
    // 1位の場合はTOP賞を加算
    if (i === 0) {
      const topPrize = (returnPoint - startPoint) * playerCount;
      return Math.floor(((calcPoint + topPrize) / 1000) * 10) / 10;
    } else {
      return Math.floor((calcPoint / 1000) * 10) / 10;
    }
  };

  const handleAutoCalcPoint = (i: number, value: string) => {
    if (!autoCalc) return;
    if (value === '') {
      setValue(`gameArray.${i}.point`, '');
      setValue(`gameArray.${i}.calcPoint`, '');
      return;
    }
    const pointValue = Number(value);
    const calcPoint = calculatePoint(pointValue, i);
    setValue(`gameArray.${i}.point`, String(pointValue));
    setValue(`gameArray.${i}.calcPoint`, String(calcPoint));
  };

  const handleAutoCalcCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setAutoCalc(isChecked);
    reset();
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
        <FormControl onChange={handleAutoCalcCheck} sx={{ width: '7rem' }}>
          <FormControlLabel
            control={<Checkbox defaultChecked color="secondary" />}
            label="自動計算"
          />
        </FormControl>
        {getValues('gameArray').map((_, i) => (
          <Stack spacing={1} key={i}>
            <Grid container spacing={1}>
              <Grid size={1} sx={{ minWidth: '4rem' }}>
                <Controller
                  name={`gameArray.${i}.rank`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      required
                      label="順位"
                      type="number"
                      disabled={autoCalc}
                      sx={{ minWidth: '4rem' }}
                    >
                      {getValues('gameArray').map((_, i) => (
                        <MenuItem key={i} value={i + 1}>
                          {i + 1}
                        </MenuItem>
                      ))}
                    </TextField>
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
                    <TextField
                      {...field}
                      required
                      label="順位点"
                      disabled={autoCalc}
                      type="number"
                    />
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

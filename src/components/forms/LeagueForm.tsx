import { useEffect, useState } from 'react';
import {
  Stack,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  MenuItem,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { LeagueFormData, LeagueRuleFormData, League } from '../../types/league';
import { MahjongSoulRule, TenhouRule, MLeagueRule } from './const-rules';
import { usePostLeagueData } from '../../hooks/useLeagueData';
import { useNavigate } from 'react-router-dom';

export default function LeagueForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    getValues,
    reset,
  } = useForm<LeagueFormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      manual: '',
      playerCount: '4',
      gameType: '半荘戦',
      tanyao: true,
      back: true,
      dora: '0',
      startPoint: '',
      returnPoint: '',
      umaArray: Array(4).fill(''),
    },
  });

  const validation = {
    name: {
      required: '必須項目です。',
      minLength: { value: 3, message: '3文字以上で入力してください。' },
    },
    startPoint: {
      required: '必須項目です',
      minLength: { value: 4, message: '4桁以上で入力してください。' },
    },
    returnPoint: {
      required: '必須項目です',
      minLength: { value: 4, message: '4桁以上で入力してください。' },
    },
    umaArray: {
      required: '必須項目です',
    },
  };

  const { postLeagueData, id } = usePostLeagueData();
  const navigate = useNavigate();

  // 大会ページに遷移する
  useEffect(() => {
    if (id) {
      //仮URL
      navigate(`/about/${id}`);
    }
  }, [id, navigate]);

  // 送信時の処理
  const onSubmit: SubmitHandler<LeagueFormData> = async (formData) => {
    // FormDataをAPI用のデータに加工
    const league: League = {
      name: formData.name,
      manual: formData.manual,
      rule: {
        playerCount: parseInt(formData.playerCount, 10),
        gameType: formData.gameType,
        tanyao: formData.tanyao,
        back: formData.back,
        dora: parseInt(formData.dora, 10),
        startPoint: parseInt(formData.startPoint, 10),
        returnPoint: parseInt(formData.returnPoint, 10),
        uma: formData.umaArray.map(Number),
      },
    };
    await postLeagueData(league);
  };

  const [selectedRule, setSelectedRule] = useState<string>('');
  const [umaArray, setUmaArray] = useState<string[]>(getValues('umaArray'));

  const handleRuleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // ウマ配列を初期化
    setUmaArray(Array(4).fill(''));

    const ruleMap: Record<string, LeagueRuleFormData> = {
      M: MLeagueRule,
      T: TenhouRule,
      J: MahjongSoulRule,
    };

    const rule = ruleMap[value];

    if (!rule) {
      const { name, manual } = getValues();
      reset();
      setValue('name', name);
      setValue('manual', manual);
    } else {
      Object.keys(rule).forEach((key) => {
        setValue(key as keyof LeagueFormData, rule[key as keyof LeagueRuleFormData], {
          shouldValidate: true,
        });
      });
    }
    setSelectedRule(value);
  };

  const handleGameTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === '4') {
      setUmaArray([...umaArray, '']);
      setValue('umaArray', [...umaArray, '']);
    } else if (value === '3') {
      const newUmaArray = umaArray.slice(0, -1);
      setUmaArray(newUmaArray);
      setValue('umaArray', newUmaArray);
    }
  };

  return (
    <>
      <Stack component="form" sx={{ width: '100%' }} spacing={1} onSubmit={handleSubmit(onSubmit)}>
        <h2>大会登録</h2>
        <Controller
          name="name"
          control={control}
          rules={validation.name}
          render={({ field }) => (
            <TextField
              {...field}
              required
              fullWidth
              label="大会名"
              error={errors.name !== undefined}
              helperText={errors.name?.message}
            />
          )}
        ></Controller>

        <Controller
          name="manual"
          control={control}
          render={({ field }) => <TextField {...field} fullWidth label="説明" multiline rows={4} />}
        ></Controller>

        <FormControl>
          <FormLabel>ルール</FormLabel>
          <RadioGroup row value={selectedRule} onChange={handleRuleChange}>
            <FormControlLabel
              value="M"
              sx={{ minWidth: '10rem' }}
              control={<Radio color="secondary" />}
              label="Mリーグルール"
            />
            <FormControlLabel
              value="J"
              sx={{ minWidth: '10rem' }}
              control={<Radio color="secondary" />}
              label="雀魂半荘ルール"
            />
            <FormControlLabel
              value="T"
              sx={{ minWidth: '10rem' }}
              control={<Radio color="secondary" />}
              label="天鳳半荘ルール"
            />
            <FormControlLabel
              value="C"
              sx={{ minWidth: '10rem' }}
              control={<Radio color="secondary" />}
              label="カスタムルール"
            />
          </RadioGroup>
        </FormControl>

        <FormLabel>人数</FormLabel>
        <Controller
          name="playerCount"
          control={control}
          render={({ field }) => (
            <RadioGroup
              {...field}
              row
              onChange={(e) => {
                field.onChange(e);
                handleGameTypeChange(e);
              }}
            >
              <FormControlLabel
                sx={{ width: '10rem' }}
                value="4"
                control={<Radio color="secondary" />}
                label="4人麻雀"
              />
              <FormControlLabel value="3" control={<Radio color="secondary" />} label="3人麻雀" />
            </RadioGroup>
          )}
        ></Controller>

        <FormLabel>局数</FormLabel>
        <Controller
          name="gameType"
          control={control}
          render={({ field }) => (
            <RadioGroup row {...field}>
              <FormControlLabel
                sx={{ width: '10rem' }}
                value="東風戦"
                control={<Radio color="secondary" />}
                label="東風戦"
              />
              <FormControlLabel
                value="半荘戦"
                control={<Radio color="secondary" />}
                label="半荘戦"
              />
            </RadioGroup>
          )}
        ></Controller>

        <FormLabel>喰タン</FormLabel>
        <Controller
          name="tanyao"
          control={control}
          render={({ field }) => (
            <RadioGroup row {...field}>
              <FormControlLabel
                sx={{ width: '10rem' }}
                value={true}
                control={<Radio color="secondary" />}
                label="あり"
              />
              <FormControlLabel value={false} control={<Radio color="secondary" />} label="なし" />
            </RadioGroup>
          )}
        ></Controller>

        <FormLabel>後付け</FormLabel>
        <Controller
          name="back"
          control={control}
          render={({ field }) => (
            <RadioGroup row {...field}>
              <FormControlLabel
                sx={{ width: '10rem' }}
                value={true}
                control={<Radio color="secondary" />}
                label="あり"
              />
              <FormControlLabel value={false} control={<Radio color="secondary" />} label="なし" />
            </RadioGroup>
          )}
        ></Controller>

        <Controller
          name="dora"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="赤ドラ"
              sx={{ maxWidth: '15rem' }}
              slotProps={{
                select: {
                  MenuProps: {
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                        overflowY: 'auto',
                      },
                    },
                  },
                },
              }}
            >
              {[...Array(21).keys()].map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Controller
          name="startPoint"
          rules={validation.startPoint}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              label="配給原点"
              error={errors.startPoint !== undefined}
              helperText={errors.startPoint?.message}
              sx={{ maxWidth: '15rem' }}
              type="number"
            />
          )}
        ></Controller>

        <Controller
          name="returnPoint"
          rules={validation.returnPoint}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              label="返し点"
              error={errors.returnPoint !== undefined}
              helperText={errors.returnPoint?.message}
              sx={{ maxWidth: '15rem' }}
              type="number"
            />
          )}
        ></Controller>

        <Grid container spacing={1}>
          {umaArray.map((_, i) => (
            <Grid size={3} key={i}>
              <Controller
                name={`umaArray.${i}`}
                rules={validation.umaArray}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    required
                    error={errors.umaArray?.[i] !== undefined}
                    helperText={errors.umaArray?.[i]?.message}
                    label={'ウマ:' + (i + 1) + '位'}
                    type="number"
                  />
                )}
              ></Controller>
            </Grid>
          ))}
        </Grid>

        <Button variant="contained" type="submit" disabled={!isValid}>
          送信
        </Button>
      </Stack>
    </>
  );
}

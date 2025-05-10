import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
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
  Typography,
  Collapse,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { LeagueFormData } from '@/types/league';
import { MahjongSoulRule, TenhouRule, MLeagueRule } from '../consts/rules';
import { PasswordInput } from '@/components/PasswordInput';

interface FormData extends FormDataRule {
  name: string;
  manual: string;
  password: string;
}

interface FormDataRule {
  playerCount: string;
  gameType: string;
  tanyao: boolean;
  back: boolean;
  dora: string;
  startPoint: string;
  returnPoint: string;
  umaArray: string[];
}

export const LeagueForm = (props: { submit: (formdata: LeagueFormData) => void }) => {
  const { submit } = props;
  const [validateErorrMsg, setValidateErrorMsg] = useState('');
  const [disableForm, setDisableForm] = useState(false);
  const [showRuleForm, setShowRuleForm] = useState(false);
  const [selectedRule, setSelectedRule] = useState<string>('');
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    getValues,
    reset,
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      manual: '',
      password: '',
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
  const [umaArray, setUmaArray] = useState<string[]>(getValues('umaArray'));

  const validation = {
    name: {
      required: '必須項目です。',
      minLength: { value: 3, message: '3文字以上で入力してください。' },
    },
    password: {
      required: '必須項目です。',
      minLength: { value: 4, message: '4文字以上で入力してください。' },
      maxLength: { value: 11, message: '12文字未満で入力してください。' },
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

  // フォーム送信時のvalidation
  const validateFormData = (formData: FormData): boolean => {
    const { umaArray, startPoint, returnPoint } = formData;

    if (!checkTotalZero(umaArray.map(Number))) {
      setValidateErrorMsg('ウマの合計は0である必要があります。');
      return false;
    }
    if (Number(startPoint) > Number(returnPoint)) {
      setValidateErrorMsg('返し点は、配給減点と同じ数値か、それ以上の数値である必要があります。');
      return false;
    }

    return true;
  };

  const checkTotalZero = (numArray: number[]) => {
    const sum = numArray.reduce((prev, curr) => prev + curr, 0);
    return sum === 0;
  };

  // 送信時の処理
  const handleSubmitForm: SubmitHandler<FormData> = async (formData) => {
    if (!validateFormData(formData)) {
      return;
    }
    // FormDataをAPI用のデータに加工
    const leagueFormData: LeagueFormData = {
      name: formData.name,
      manual: formData.manual,
      password: formData.password,
      rule: {
        playerCount: Number(formData.playerCount),
        gameType: formData.gameType,
        tanyao: formData.tanyao,
        back: formData.back,
        dora: Number(formData.dora),
        startPoint: Number(formData.startPoint),
        returnPoint: Number(formData.returnPoint),
        uma: formData.umaArray.map(Number),
      },
    };
    submit(leagueFormData);
  };

  // ルールプリセット選択時に対応のルールをフォームに入力する
  const handleRuleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setShowRuleForm(true);
    // ウマ配列を初期化
    setUmaArray(Array(4).fill(''));

    const ruleMap: Record<string, FormDataRule> = {
      M: MLeagueRule,
      T: TenhouRule,
      J: MahjongSoulRule,
    };

    const rule = ruleMap[value];

    if (!rule) {
      const { name, manual } = getValues();
      setDisableForm(false);
      reset();
      setValue('name', name);
      setValue('manual', manual);
    } else {
      Object.keys(rule).forEach((key) => {
        setValue(key as keyof FormData, rule[key as keyof FormDataRule], {
          shouldValidate: true,
        });
      });
      setDisableForm(true);
    }
    setSelectedRule(value);
  };

  // 四麻と三麻でウマの入力フィールドの数を変更する
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
    <Stack
      component="form"
      sx={{ width: '100%' }}
      spacing={1}
      onSubmit={handleSubmit(handleSubmitForm)}
    >
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

      <Stack>
        <Controller
          name="password"
          control={control}
          rules={validation.password}
          render={({ field }) => (
            <Stack direction="row" flexWrap="nowrap" spacing={3} alignItems="center">
              <PasswordInput
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                error={errors.password !== undefined}
                helperText={errors.password?.message}
              />
              <Typography component="p">
                成績編集者を制限するためのパスワードです。
                <br />
                共同編集をする場合は、共有できるパスワードを設定して下さい。
              </Typography>
            </Stack>
          )}
        />
      </Stack>

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

      <Collapse in={showRuleForm}>
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
                disabled={disableForm}
                control={<Radio color="secondary" />}
                label="4人麻雀"
              />
              <FormControlLabel
                value="3"
                disabled={disableForm}
                control={<Radio color="secondary" />}
                label="3人麻雀"
              />
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
                disabled={disableForm}
                control={<Radio color="secondary" />}
                label="東風戦"
              />
              <FormControlLabel
                value="半荘戦"
                disabled={disableForm}
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
            <RadioGroup row {...field} onChange={(e) => field.onChange(e.target.value === 'true')}>
              <FormControlLabel
                sx={{ width: '10rem' }}
                value={true}
                disabled={disableForm}
                control={<Radio color="secondary" />}
                label="あり"
              />
              <FormControlLabel
                value={false}
                disabled={disableForm}
                control={<Radio color="secondary" />}
                label="なし"
              />
            </RadioGroup>
          )}
        ></Controller>

        <FormLabel>後付け</FormLabel>
        <Controller
          name="back"
          control={control}
          render={({ field }) => (
            <RadioGroup row {...field} onChange={(e) => field.onChange(e.target.value === 'true')}>
              <FormControlLabel
                sx={{ width: '10rem' }}
                value={true}
                disabled={disableForm}
                control={<Radio color="secondary" />}
                label="あり"
              />
              <FormControlLabel
                value={false}
                disabled={disableForm}
                control={<Radio color="secondary" />}
                label="なし"
              />
            </RadioGroup>
          )}
        ></Controller>

        <Stack sx={{ mt: '1rem' }} spacing={1}>
          <Controller
            name="dora"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                disabled={disableForm}
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
                disabled={disableForm}
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
                disabled={disableForm}
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
                      disabled={disableForm}
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
        </Stack>
      </Collapse>
      <Typography component="p" color="error">
        {validateErorrMsg}
      </Typography>

      <Button variant="contained" type="submit" color="secondary" disabled={!isValid}>
        送信
      </Button>
    </Stack>
  );
};

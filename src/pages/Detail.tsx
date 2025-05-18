import { Divider, Stack, Typography, Tabs, Tab, Button } from '@mui/material';
import { useParams } from 'react-router';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useTab } from '@/hooks/useTab';
import { LeagueRuleList } from '@/features/league/LeagueRuleList';
import { useLeagueData } from '@/features/league/hooks/useLeagueData';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useGameData } from '@/features/game/hooks/useGameData';
import { GameTotalTable } from '@/features/game/GameTotalTable';
import { GameResultTable } from '@/features/game/GameResultTable';
import { GameRegister } from '@/features/game/GameRegister';
import { FavoriteToggle } from '@/features/favorite/FavoriteToggle';
import { dateFormat } from '@/utils/date';
import { AuthRequest } from '@/features/auth/AuthRequest';

export const Detail = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const { tabValue, switchTab } = useTab('detail');
  const { id } = useParams();
  const { league } = useLeagueData();
  const { hasGameListData, gameEdit } = useGameData();
  const { isAuth } = useAuth();

  if (!league || !id) return null;

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap">
        <Tabs
          value={tabValue}
          onChange={switchTab}
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab value="detail" label="詳細" disabled={gameEdit.isEdit}></Tab>
          <Tab value="edit" label="成績管理" disabled={gameEdit.isEdit}></Tab>
          <Tab value="setting" label="設定" disabled={gameEdit.isEdit}></Tab>
        </Tabs>
        <FavoriteToggle favorite={{ id: league.id, name: league.name }} />
      </Stack>

      {tabValue === 'detail' && (
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap">
            <Typography
              flexGrow="1"
              variant="h2"
              style={{ wordBreak: 'break-word', whiteSpace: 'normal' }}
            >
              {league.name}
            </Typography>
            <Typography component="p">作成日:{dateFormat(league.createdAt)}</Typography>
          </Stack>
          {league.manual && (
            <Stack spacing={1}>
              <Typography variant="h3">詳細</Typography>
              <Divider />
              <Typography sx={{ overflowWrap: 'break-word' }} component="p">
                {league.manual}
              </Typography>
            </Stack>
          )}
          <Stack spacing={1}>
            <Typography variant="h3">ルール</Typography>
            <Divider />
            <LeagueRuleList rule={league.rule} />
          </Stack>
          <GameTotalTable id={id}></GameTotalTable>
        </Stack>
      )}

      {tabValue === 'edit' && (
        <Stack spacing={3}>
          <Stack direction="row">
            <Typography minWidth="15rem" variant="h2">
              成績管理
            </Typography>
          </Stack>

          <Stack spacing={0.5}>
            {isAuth && (
              <Stack direction="row" justifyContent="end" spacing={0.5}>
                <Button
                  variant={isOpen ? 'contained' : 'outlined'}
                  color="secondary"
                  onClick={open}
                >
                  成績登録
                </Button>
                {hasGameListData && (
                  <Button
                    variant={gameEdit.isEdit ? 'contained' : 'outlined'}
                    color="secondary"
                    onClick={gameEdit.toggle}
                  >
                    編集モード
                  </Button>
                )}
              </Stack>
            )}
            <GameResultTable id={id} isEdit={gameEdit.isEdit} rule={league.rule}></GameResultTable>
          </Stack>
        </Stack>
      )}

      {tabValue === 'setting' && (
        <Stack spacing={3}>
          <Stack direction="row">
            <Typography minWidth="15rem" variant="h2">
              設定
            </Typography>
          </Stack>

          <Typography minWidth="15rem" variant="subtitle1" component="label">
            編集権限リクエスト
          </Typography>
          <AuthRequest />
        </Stack>
      )}
      <GameRegister rule={league.rule} isOpen={isOpen} close={close}></GameRegister>
    </Stack>
  );
};

import { List, ListItem, ListItemText } from '@mui/material';
import { LeagueRule } from '@/types/league';

export const LeagueRuleList = (props: { rule: LeagueRule }) => {
  const { rule } = props;
  return (
    <List disablePadding>
      <ListItem disablePadding>
        <ListItemText sx={{ flex: '0 0 40%' }} primary="ゲーム" />
        <ListItemText primary={rule.playerCount === 3 ? '三人麻雀' : '四人麻雀'} />
      </ListItem>
      <ListItem disablePadding>
        <ListItemText sx={{ flex: '0 0 40%' }} primary="局数" />
        <ListItemText primary={rule.gameType} />
      </ListItem>
      <ListItem disablePadding>
        <ListItemText sx={{ flex: '0 0 40%' }} primary="喰いタン" />
        <ListItemText primary={rule.tanyao ? 'あり' : 'なし'} />
      </ListItem>
      <ListItem disablePadding>
        <ListItemText sx={{ flex: '0 0 40%' }} primary="後付け" />
        <ListItemText primary={rule.back ? 'あり' : 'なし'} />
      </ListItem>
      <ListItem disablePadding>
        <ListItemText sx={{ flex: '0 0 40%' }} primary="赤ドラ" />
        <ListItemText primary={rule.dora + '枚'} />
      </ListItem>
      <ListItem disablePadding>
        <ListItemText sx={{ flex: '0 0 40%' }} primary="配給原点" />
        <ListItemText primary={rule.startPoint} />
      </ListItem>
      <ListItem disablePadding>
        <ListItemText sx={{ flex: '0 0 40%' }} primary="返し点" />
        <ListItemText primary={rule.returnPoint} />
      </ListItem>
      <ListItem disablePadding>
        <ListItemText sx={{ flex: '0 0 40%' }} primary="ウマ" />
        <ListItemText primary={rule.uma.join(', ')} />
      </ListItem>
    </List>
  );
};

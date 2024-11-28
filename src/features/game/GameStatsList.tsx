import { List, ListItem, ListItemText } from '@mui/material';
import { useAtomValue } from 'jotai';
import { gameResultTotalAtom } from './jotai/gameResultTotalAtom';

export const GameStatsList = (props: { name: string }) => {
  const { name } = props;
  const results = useAtomValue(gameResultTotalAtom).find((result) => result.name === name);
  return (
    <List disablePadding>
      <ListItem disablePadding sx={{ flexWrap: 'wrap' }}>
        <ListItemText primary={`対戦回数：${results?.gameCount}回`} />
        <ListItemText primary={`合計得点：${results?.totalPoint}点`} />
        <ListItemText primary={`平均着順：${results?.averageRank}位`} />
      </ListItem>
    </List>
  );
};

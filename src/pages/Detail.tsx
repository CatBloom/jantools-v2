import { useEffect } from 'react';
import { GeneralTable, RuleList, GameTotalRow } from '../components';
import { Divider, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { GameResultTotal } from '../types/game';
import { Column } from '../types/common';
import { dateFormat } from '../utils/date';
import { useLeagueData } from '../hooks/useLeagueData';
import { useGameData } from '../hooks/useGameData';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { gameResultTotalSelector } from '../recoil/selectors';
import { loadingAtom } from '../recoil/atoms';

export default function Detail() {
  const { league, fetchLeagueData } = useLeagueData();
  const { fetchGameListData } = useGameData();
  const setLoading = useSetRecoilState(loadingAtom);
  const gameResultTotal = useRecoilValue(gameResultTotalSelector);

  const { id } = useParams();

  const columns: Column<GameResultTotal>[] = [
    { key: 'rank', display: '順位' },
    { key: 'name', display: '名前' },
    { key: 'gameCount', display: '対戦数' },
    { key: 'totalPoint', display: '合計得点' },
    { key: 'averageRank', display: '平均着順' },
  ];

  useEffect(() => {
    const fetchData = async (id: string) => {
      setLoading(true);
      await Promise.all([fetchLeagueData(id), fetchGameListData(id)]);
      setLoading(false);
    };

    if (id) {
      fetchData(id);
    }
  }, [id]);

  return (
    <>
      <Stack spacing={3}>
        {league && (
          <>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
            >
              <Typography minWidth="15rem" variant="h2">
                {league.name}
              </Typography>
              {league.createdAt && (
                <Typography component="p">作成日:{dateFormat(league.createdAt)}</Typography>
              )}
            </Stack>
            {league.manual && (
              <Stack spacing={1}>
                <Typography variant="h3">詳細</Typography>
                <Divider />
                <Typography component="p">{league.manual}</Typography>
              </Stack>
            )}
            {league.rule && (
              <Stack spacing={1}>
                <Typography variant="h3">ルール</Typography>
                <Divider />
                <RuleList rule={league.rule} />
              </Stack>
            )}
          </>
        )}
        {gameResultTotal && (
          <GeneralTable<GameResultTotal>
            rows={gameResultTotal}
            columns={columns}
            align="center"
            RowComponent={GameTotalRow}
          />
        )}
      </Stack>
    </>
  );
}

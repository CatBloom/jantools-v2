import { useEffect } from 'react';
import { GeneralTable } from '../components/tables/GeneralTable';
import { useFetchLeagueData } from '../hooks/useLeagueData';
import { Divider, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { RuleList } from '../components/lists/RuleList';
import { GameTotalRow } from '../components/tables/GameTotalRow';
import { GameResultTotal } from '../types/game';
import { Column } from '../types/common';

export default function Detail() {
  const { fetchLeagueData, league } = useFetchLeagueData();
  const { id } = useParams();

  const columns: Column<GameResultTotal>[] = [
    { key: 'rank', display: '順位' },
    { key: 'name', display: '名前' },
    { key: 'gameCount', display: '対戦数' },
    { key: 'totalPoint', display: '合計得点' },
    { key: 'averageRank', display: '平均着順' },
  ];

  const mockGameTotalResult = [
    { rank: 1, name: 'atest', gameCount: 1, totalPoint: 40000, averageRank: 1 },
    { rank: 2, name: 'btest', gameCount: 1, totalPoint: 35000, averageRank: 2 },
    { rank: 3, name: 'ctest', gameCount: 1, totalPoint: 20000, averageRank: 3 },
    { rank: 4, name: 'dtest', gameCount: 1, totalPoint: 5000, averageRank: 4 },
  ];

  useEffect(() => {
    if (id) {
      fetchLeagueData(id);
    }
  }, [id]);

  return (
    <>
      <Stack spacing={3}>
        {league && (
          <>
            <Typography variant="h2">{league.name}</Typography>
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
        <GeneralTable<GameResultTotal>
          rows={mockGameTotalResult}
          columns={columns}
          align="center"
          RowComponent={GameTotalRow}
        />
      </Stack>
    </>
  );
}

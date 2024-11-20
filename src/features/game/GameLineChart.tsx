import { Box } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { gameLineChartAtom } from './jotai/gameLineChartAtom';
import { useParams } from 'react-router-dom';

export const GameLineChart = () => {
  const { name } = useParams();
  const results = useAtomValue(useMemo(() => gameLineChartAtom(name), [name]));

  const formatValue = (value: number | null) => {
    return value !== null ? `${value}位` : '';
  };

  return (
    <Box sx={{ width: '100%' }}>
      <LineChart
        height={200}
        series={[
          {
            curve: 'linear',
            data: results.map((v) => v.rank),
            valueFormatter: formatValue,
          },
        ]}
        xAxis={[
          {
            scaleType: 'point',
            data: results.map((v) => v.createAt),
            valueFormatter: (v: string) => {
              return v.slice(0, 4) + '\n' + v.slice(5);
            },
          },
        ]}
        yAxis={[{ min: 1, max: 4, valueFormatter: formatValue, reverse: true }]}
        bottomAxis={null}
        leftAxis={null}
        axisHighlight={{ x: 'none' }}
      ></LineChart>
    </Box>
  );
};

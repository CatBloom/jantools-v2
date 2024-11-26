import { LineChart } from '@mui/x-charts';
import { useAtomValue } from 'jotai';
import { gameLineChartAtom } from './jotai/gameLineChartAtom';

export const GameLineChart = (props: { name: string }) => {
  const { name } = props;

  const results = useAtomValue(gameLineChartAtom)
    .filter((result) => result.name === name)
    .flatMap((result) => result.results);

  return (
    <LineChart
      height={200}
      margin={{ left: 10 }}
      series={[
        {
          curve: 'linear',
          data: results.map((v) => v.rank),
          valueFormatter: (value: number | null) => `${value}位`,
        },
      ]}
      xAxis={[
        {
          scaleType: 'point',
          data: results.map((v) => v.createdAt).slice(0, 10),
        },
      ]}
      yAxis={[{ min: 0.9, max: 4.1, reverse: true }]}
      bottomAxis={null}
      leftAxis={null}
      axisHighlight={{ x: 'none' }}
      tooltip={{ trigger: 'item' }}
    ></LineChart>
  );
};

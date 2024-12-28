import { PieChart } from '@mui/x-charts';
import { useGameData } from './hooks/useGameData';

export const GamePieChart = (props: { name: string }) => {
  const { name } = props;
  const { pieChartData } = useGameData();
  const results = pieChartData
    .filter((result) => result.name === name)
    .flatMap((game) => game.results);

  return (
    <PieChart
      colors={['#C96868', '#DEAA79', '#B1C29E', '#7EACB5']}
      series={[
        {
          arcLabel: (item) => `${item.value}%`,
          arcLabelMinAngle: 30,
          arcLabelRadius: 60,
          data: results,
          valueFormatter: (item: { value: number }) => `${item.value}%`,
        },
      ]}
      height={200}
    />
  );
};

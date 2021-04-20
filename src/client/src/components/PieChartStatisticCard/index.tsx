import React from 'react';
import * as HighCharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import ReloadableCard, { Props as ReloadableCardProps } from '../ReloadableCard';

import { DEFAULT_COLORS, getPlayerColor } from '../../util/colors';
import { ValueStatistic } from '../../interfaces/skipboGame';
import styles from './PieChartStatisticCard.module.css';

export interface Props extends Omit<ReloadableCardProps, 'children'> {
  title: string;
  data: ValueStatistic[];
}

const PieChartStatisticCard: React.FC<Props> = ({ title, fetchData, data }: Props) => {
  const options: HighCharts.Options = {
    chart: {
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: '',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y} (<b>{point.percentage:.1f}%)</b>',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
        },
      },
    },
    colors: DEFAULT_COLORS,
    series: [
      {
        name: 'Spiele',
        type: 'pie',
        data: data.map((data) => ({ ...data, color: getPlayerColor(data.name) })),
      },
    ],
  };
  return (
    <ReloadableCard title={title} fetchData={fetchData}>
      {data.length >= 1 && (
        <HighchartsReact highcharts={HighCharts} options={options} containerProps={{ className: styles.Chart }} />
      )}
    </ReloadableCard>
  );
};

export default PieChartStatisticCard;

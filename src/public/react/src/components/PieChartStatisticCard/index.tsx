import React, { useState } from 'react';
import * as HighCharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import styles from './PieChartStatisticCard.module.css';
import ReloadableCard, { Props as ReloadableCardProps } from '../ReloadableCard';

export interface Props extends Omit<ReloadableCardProps, 'children'> {
  title: string;
}

const PieChartStatisticCard: React.FC<Props> = ({ title, fetchData }: Props) => {
  const [data, setData] = useState([] as { name: string; y: number }[]);
  const loadData = (): Promise<void> => {
    return fetchData().then((data: { name: string; y: number }[]) => setData(data));
  };
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
    series: [
      {
        name: 'Spiele',
        type: 'pie',
        data: data,
      },
    ],
  };
  return (
    <ReloadableCard title={title} fetchData={loadData}>
      {data.length >= 1 && (
        <HighchartsReact highcharts={HighCharts} options={options} containerProps={{ className: styles.Chart }} />
      )}
    </ReloadableCard>
  );
};

export default PieChartStatisticCard;

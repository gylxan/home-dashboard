import React, { useState } from 'react';
import * as HighCharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import ReloadableCard, { Props as ReloadableCardProps } from '../ReloadableCard';

import styles from './ColumnStatisticCard.module.css';

export interface Props extends Omit<ReloadableCardProps, 'children'> {
  title: string;
  yAxisTitle: string;
  seriesName: string;
}

const ColumnStatisticCard: React.FC<Props> = ({ title, yAxisTitle, fetchData }: Props) => {
  const [data, setData] = useState([] as { name: string; y: number }[]);

  const loadData = async (): Promise<void> => setData(await fetchData());

  const options: HighCharts.Options = {
    chart: {
      type: 'column',
    },
    title: {
      text: '',
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {
      min: 0,
      title: {
        text: yAxisTitle,
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y}</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true,
    },
    colors: ['#E3B505', '#95190C', '#610345', '#107E7D', '#044B7F', '#6A7B76'],
    series: [
      {
        name: 'Spiele',
        type: 'column',
        colorByPoint: true,
        data,
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

export default ColumnStatisticCard;
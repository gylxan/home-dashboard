import React from 'react';
import * as HighCharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import ReloadableCard, { Props as ReloadableCardProps } from '../ReloadableCard';

import { getPlayerColor } from '../../util/colors';
import { ValueStatistic } from '../../interfaces/skipboGame';

import styles from './ColumnStatisticCard.module.css';

export interface Props extends Omit<ReloadableCardProps, 'children'> {
  data: ValueStatistic[];
  title: string;
  yAxisTitle: string;
  seriesName: string;
}

const ColumnStatisticCard: React.FC<Props> = ({ title, yAxisTitle, fetchData, data }: Props) => {
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
    series: [
      {
        name: 'Spiele',
        type: 'column',
        colorByPoint: true,
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

export default ColumnStatisticCard;

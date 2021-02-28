import React from 'react';
import * as HighCharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import ReloadableCard, { Props as ReloadableCardProps } from '../ReloadableCard';

import { getDefaultChartOptions } from '../../util/highcharts';
import { getPlayerColor } from '../../util/colors';
import { DataStatistic } from '../../interfaces/skipboGame';

import styles from './LineChartStatisticCard.module.css';

export interface Props extends Omit<ReloadableCardProps, 'children'> {
  title: string;
  yAxisTitle: string;
  data: DataStatistic[];
}

const LineChartStatisticCard: React.FC<Props> = ({ title, yAxisTitle, fetchData, data }: Props) => {
  const options: HighCharts.Options = {
    ...getDefaultChartOptions(),
    chart: {
      zoomType: 'x',
    },
    title: {
      text: '',
    },
    yAxis: {
      title: {
        text: yAxisTitle,
      },
      min: 1,
    },

    xAxis: {
      type: 'datetime',
      title: {
        text: 'Spieldatum',
      },
    },

    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
    },

    series: data.map((winnerEntry) => ({
      ...winnerEntry,
      type: 'line',
      data: winnerEntry.data.map((dataEntry: any[]) => [new Date(dataEntry[0]).getTime(), dataEntry[1]]),
      color: getPlayerColor(winnerEntry.name),
    })),

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom',
            },
          },
        },
      ],
    },
  };
  return (
    <ReloadableCard title={title} fetchData={fetchData}>
      {data.length >= 1 && (
        <HighchartsReact highcharts={HighCharts} options={options} containerProps={{ className: styles.Chart }} />
      )}
    </ReloadableCard>
  );
};

export default LineChartStatisticCard;

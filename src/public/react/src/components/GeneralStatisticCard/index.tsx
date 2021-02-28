import React from 'react';
import ReloadableCard, { Props as ReloadableStatisticCardProps } from '../ReloadableCard';
import { Table } from 'react-bootstrap';
import { GeneralStatistic } from '../../interfaces/skipboGame';
import { getFormattedDate } from '../../util/date';

//import styles from './GeneralStatisticCard.module.css';

export interface Props extends Omit<ReloadableStatisticCardProps, 'children'> {
  data: GeneralStatistic | undefined;
}

const GeneralStatisticCard: React.FC<Props> = ({ title, fetchData, data }: Props) => {
  const getFormattedValue = (value: string | number | Date): string | number =>
    value instanceof Date ? getFormattedDate(value) : value;

  return (
    <ReloadableCard title={title} fetchData={fetchData}>
      {!data ? null : Array.isArray(data) ? null : (
        <Table responsive>
          <tbody>
            {Object.keys(data).map((key) => {
              const currentEntry = (data as GeneralStatistic)[key];
              return (
                <tr key={key}>
                  <td>{currentEntry.label}</td>
                  <td>{getFormattedValue(currentEntry.value)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </ReloadableCard>
  );
};

export default GeneralStatisticCard;

import React, { useState } from 'react';
import ReloadableCard, { Props as ReloadableStatisticCardProps } from '../ReloadableCard';
import { Table } from 'react-bootstrap';
import { GeneralStatistic } from '../../interfaces/skipboGame';

//import styles from './GeneralStatisticCard.module.css';

export type Props = Omit<ReloadableStatisticCardProps, 'children'>;

const GeneralStatisticCard: React.FC<Props> = ({ title, fetchData }: Props) => {
  const [data, setData] = useState({});
  const loadData = (): Promise<void> => {
    return fetchData().then((data: GeneralStatistic | any[]) => setData(data));
  };

  const getFormattedValue = (value: string | number | Date): string | number =>
   value instanceof Date ? value.toLocaleString('de-DE') : value;

  return (
    <ReloadableCard title={title} fetchData={loadData}>
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

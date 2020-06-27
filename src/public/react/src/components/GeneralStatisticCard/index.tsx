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

  return (
    <ReloadableCard title={title} fetchData={loadData}>
      {!data ? null : Array.isArray(data) ? null : (
        <Table responsive>
          <tbody>
            {Object.keys(data).map((key) => {
              const currData = (data as GeneralStatistic)[key];
              return (
                <tr key={key}>
                  <td>{currData.label}</td>
                  <td>{currData.value}</td>
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

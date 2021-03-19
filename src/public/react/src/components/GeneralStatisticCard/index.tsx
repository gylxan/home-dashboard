import React from 'react';
import ReloadableCard, { Props as ReloadableStatisticCardProps } from '../ReloadableCard';
import { GeneralStatistic } from '../../interfaces/skipboGame';
import { getFormattedDate } from '../../util/date';
import Table from '../Table';

export interface Props extends Omit<ReloadableStatisticCardProps, 'children'> {
  data: GeneralStatistic | undefined;
}

const GeneralStatisticCard: React.FC<Props> = ({ title, fetchData, data }: Props) => {
  const getFormattedValue = (value: string | number | Date, label?: string): string | number => {
    if ((!!label && label.indexOf('zeit') !== -1) || value instanceof Date) {
      return getFormattedDate(value as string | Date);
    }
    return value;
  };

  return (
    <ReloadableCard title={title} fetchData={fetchData}>
      {!data ? null : Array.isArray(data) ? null : (
        <Table>
          <Table.Body>
            {Object.keys(data).map((key) => {
              const currentEntry = (data as GeneralStatistic)[key];
              return (
                <Table.Row key={key}>
                  <Table.Cell>{currentEntry.label}</Table.Cell>
                  <Table.Cell>{getFormattedValue(currentEntry.value, currentEntry.label)}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      )}
    </ReloadableCard>
  );
};

export default GeneralStatisticCard;

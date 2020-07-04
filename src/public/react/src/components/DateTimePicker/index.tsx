import React from 'react';
import DatePicker, { registerLocale, ReactDatePickerProps } from 'react-datepicker';
import de from 'date-fns/locale/de';

import styles from './DateTimePicker.module.css';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('de', de);

export interface Props extends Omit<ReactDatePickerProps, 'locale' | 'dateFormat' | 'timeFormat' | 'showTimeInput'> {}

const DateTimePicker: React.FC<Props> = ({ ...props }: Props) => (
  <DatePicker className={styles.DateTimePicker} locale="de" showTimeInput timeFormat="p" dateFormat="Pp" {...props} />
);

export default DateTimePicker;

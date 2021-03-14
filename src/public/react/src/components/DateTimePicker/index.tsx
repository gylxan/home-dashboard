import React from 'react';
import { DateTimePicker as MuiDateTimePicker, DateTimePickerProps } from '@material-ui/pickers';

import styles from './DateTimePicker.module.css';

export type Props = DateTimePickerProps;

const DateTimePicker: React.FC<Props> = ({ ...props }: Props) => (
  <MuiDateTimePicker className={styles.DateTimePicker} {...props} />
);

export default DateTimePicker;

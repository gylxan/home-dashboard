import React from 'react';
import { Alert as MaterialUiAlert, AlertProps } from '@material-ui/lab';

export type Props = AlertProps;

const Alert: React.FC<Props> = (props: Props) => <MaterialUiAlert {...props} />;

export default Alert;

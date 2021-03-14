import React from 'react';
import { CircularProgress, CircularProgressProps } from '@material-ui/core';


export type Props = CircularProgressProps;

const Spinner: React.FC<Props> = (props) => <CircularProgress {...props} />;

export default Spinner;

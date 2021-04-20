import React from 'react';
import { CircularProgress, CircularProgressProps } from '@material-ui/core';

export interface Props extends CircularProgressProps {
  size?: Size;
}
export enum Size {
  Small,
  Normal,
}

const Spinner: React.FC<Props> = ({ size = Size.Normal, ...props }) => (
  <CircularProgress {...props} size={size === Size.Small ? '1rem' : undefined} />
);

export default Spinner;

import React from 'react';
import { Fab as MuiFab, FabProps } from '@material-ui/core';

export type Props = FabProps;

const FloatingActionButton: React.FC<Props> = ({ color = 'secondary', ...props }) => (
  <MuiFab color={color} {...props} />
);

export default FloatingActionButton;

import React from 'react';
import { Fab as MuiFab, FabProps } from '@material-ui/core';
import classNames from 'classnames';

import styles from './FloatingActionButton.module.css';

export type Props = FabProps;

const FloatingActionButton: React.FC<Props> = ({ color = 'secondary', className, ...props }) => (
  <MuiFab color={color} className={classNames(styles.FloatingActionButton, className)} {...props} />
);

export default FloatingActionButton;

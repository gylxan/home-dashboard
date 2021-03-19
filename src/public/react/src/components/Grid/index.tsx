import React from 'react';
import { Grid as MaterialUiGrid, GridProps } from '@material-ui/core';

export type Props = GridProps;

const Grid: React.FC<Props> = (props: Props) => <MaterialUiGrid {...props} />;

export default Grid;

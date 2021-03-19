import React from 'react';
import { TableHead as MaterialUiTableHead, TableHeadProps } from '@material-ui/core';

export type Props = TableHeadProps;

const TableHead: React.FC<Props> = (props: Props) => <MaterialUiTableHead {...props} />;

export default TableHead;

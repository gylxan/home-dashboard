import React from 'react';
import { TableBody as MaterialUiTableBody, TableBodyProps } from '@material-ui/core';

export type Props = TableBodyProps;

const TableBody: React.FC<Props> = (props: Props) => <MaterialUiTableBody {...props} />;

export default TableBody;

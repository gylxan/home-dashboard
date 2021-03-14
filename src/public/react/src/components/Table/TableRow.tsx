import React from 'react';
import { TableRow as MaterialUiTableRow, TableRowProps } from '@material-ui/core';

export type Props = TableRowProps;

const TableRow: React.FC<Props> = (props: Props) => <MaterialUiTableRow {...props} />;

export default TableRow;

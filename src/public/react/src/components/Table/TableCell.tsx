import React from 'react';
import { TableCell as MaterialUiTableCell, TableCellProps } from '@material-ui/core';

export type Props = TableCellProps;

const TableCell: React.FC<Props> = (props: Props) => <MaterialUiTableCell {...props} />;

export default TableCell;

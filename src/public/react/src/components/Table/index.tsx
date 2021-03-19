import React from 'react';
import { Table as MaterialUiTable, TableProps } from '@material-ui/core';
import TableRow from './TableRow';
import TableBody from './TableBody';
import TableCell from './TableCell';
import TableHead from './TableHead';

export type Props = TableProps;

interface SubComponents {
  Head: typeof TableHead;
  Body: typeof TableBody;
  Row: typeof TableRow;
  Cell: typeof TableCell;
}

const Table: React.FC<Props> & SubComponents = (props: Props) => <MaterialUiTable {...props} />;

Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;

export default Table;

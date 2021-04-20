import React from 'react';
import {List as MuiList, ListItem, ListItemText, ListProps} from '@material-ui/core';

interface SubComponents {
  Item: typeof ListItem;
  ItemText: typeof ListItemText;
}
export type Props = ListProps;

const List: React.FC<Props> & SubComponents = (props) => <MuiList {...props}  />;

List.Item = ListItem;
List.ItemText = ListItemText;

export default List;

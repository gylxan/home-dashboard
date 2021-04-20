import React from 'react';
import { Menu as MaterialUiMenu, MenuItem, MenuProps } from '@material-ui/core';

export type Props = MenuProps;

interface SubComponents {
  Item: typeof MenuItem;
}

const Menu: React.FC<Props> & SubComponents = ({ elevation = 1, ...props }: Props) => (
  <MaterialUiMenu elevation={elevation} {...props} />
);

Menu.Item = MenuItem;

export default Menu;

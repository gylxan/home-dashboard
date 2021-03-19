import React from 'react';
import { AppBar as MuiAppBar, Toolbar, AppBarProps } from '@material-ui/core';

interface SubComponents {
  Toolbar: typeof Toolbar;
}
export type Props = AppBarProps;

const AppBar: React.FC<Props> & SubComponents = (props: Props) => <MuiAppBar {...props} />;


AppBar.Toolbar = Toolbar;

export default AppBar;

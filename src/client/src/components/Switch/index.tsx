import React from 'react';
import { Switch as MuiSwitch, SwitchProps } from '@material-ui/core';


export type Props = SwitchProps;

const Switch: React.FC<Props> = (props) => <MuiSwitch {...props} />;

export default Switch;

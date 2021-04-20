import React from 'react';
import { Button as MaterialUiButton, ButtonProps } from '@material-ui/core';


export type Props = ButtonProps;

const Button: React.FC<Props> = (props: Props) => <MaterialUiButton {...props} />;

export default Button;

import React from 'react';
import { IconButton as MaterialUiIconButton, IconButtonProps } from '@material-ui/core';

export type Props = IconButtonProps;

const IconButton: React.FC<Props> = (props) => <MaterialUiIconButton {...props} />;

export default IconButton;

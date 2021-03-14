import React from 'react';
import { TextField as MaterialUiTextField, TextFieldProps } from '@material-ui/core';

export type Props = TextFieldProps;

const TextField: React.FC<Props> = (props) => <MaterialUiTextField {...props} />;

export default TextField;

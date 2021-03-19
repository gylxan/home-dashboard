import React from 'react';
import { Checkbox as MaterialUiCheckbox, CheckboxProps, FormControlLabel } from '@material-ui/core';

export interface Props extends CheckboxProps {
  label: string;
}

const Checkbox: React.FC<Props> = ({ label, ...props }: Props) => (
  <FormControlLabel control={<MaterialUiCheckbox {...props} />} label={label} />
);

export default Checkbox;

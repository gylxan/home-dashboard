import React from 'react';
import { Typography as MaterialUiTypography, TypographyProps } from '@material-ui/core';

export type Props = TypographyProps;

const Typography: React.FC<Props> = (props) => <MaterialUiTypography {...props} />;

export default Typography;

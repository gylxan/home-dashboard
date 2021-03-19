import React from 'react';
import { CardContent as MaterialUiCardContent, CardContentProps } from '@material-ui/core';

export type Props = CardContentProps;

const CardContent: React.FC<Props> = (props: Props) => <MaterialUiCardContent {...props} />;

export default CardContent;

import React from 'react';
import { Card as MaterialUiCard, CardProps } from '@material-ui/core';
import CardContent from './CardContent';

export type Props = CardProps;

interface SubComponents {
  Content: typeof CardContent;
}

const Card: React.FC<Props> & SubComponents = (props: CardProps) => <MaterialUiCard {...props} />;

Card.Content = CardContent;

export default Card;

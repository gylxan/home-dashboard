import React from 'react';
import { Link } from 'react-router-dom';
import Button, { Props as ButtonProps } from '../Button';

export interface Props extends ButtonProps {
  to: string;
  children?: React.ReactNode;
}

const LinkButton: React.FC<Props> = ({ to, children, ...otherProps }: Props) => (
  <Link to={to} tabIndex={-1}>
    <Button {...otherProps}>{children}</Button>
  </Link>
);

export default LinkButton;

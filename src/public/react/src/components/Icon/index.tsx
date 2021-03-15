import React from 'react';
import classNames from 'classnames';
import { Icon as MuiIcon, IconProps } from '@material-ui/core';

import styles from './Icon.module.css';

export interface Props extends IconProps {
  clickable?: boolean;
  icon: string;
}

const Icon: React.FC<Props> = React.forwardRef(({ clickable = false, className, icon, ...props }, ref) => (
  <MuiIcon component="span" className={classNames({ [styles.Clickable]: clickable }, className)} {...props} ref={ref}>
    {icon}
  </MuiIcon>
));

export default Icon;

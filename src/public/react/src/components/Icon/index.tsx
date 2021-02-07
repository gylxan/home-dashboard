import React from 'react';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import styles from './Icon.module.css';

export interface Props extends FontAwesomeIconProps {
  clickable?: boolean;
}

const Icon: React.FC<Props> = React.forwardRef(({ clickable = false, className, ...props }, ref) => (
  <FontAwesomeIcon className={classNames({ [styles.Clickable]: clickable }, className)} {...props} forwardedRef={ref} />
));

export default Icon;

import React from 'react';
import { Link } from 'react-router-dom';
import routes from 'util/routes';
import Icon from '../../../components/Icon';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Typography from "../../../components/Typography";

import styles from './Tile.module.css';

export interface Props {
  name: string;
  label: string;
  imagePath?: string;
  icon?: IconProp;
  description?: string;
  backgroundColor?: string;
}

const Tile: React.FC<Props> = ({ name, label, backgroundColor, imagePath, icon }: Props) => {
  return (
    <Link className={styles.Tile} to={routes[name]} style={{ backgroundColor }}>
      {!!imagePath && <img className={styles.Icon} src={imagePath} alt="icon" />}
      {!!icon && <Icon className={styles.Icon} icon={icon} color="black" size="4x" />}
      <Typography variant="h6">{label}</Typography>
    </Link>
  );
};

export default Tile;

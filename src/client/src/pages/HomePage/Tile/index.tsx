import React from 'react';
import { Link } from 'react-router-dom';
import routes from 'util/routes';
import Typography from '../../../components/Typography';

import styles from './Tile.module.css';

export interface Props {
  name: string;
  label: string;
  imagePath?: string;
  description?: string;
  backgroundColor?: string;
}

const Tile: React.FC<Props> = ({ name, label, backgroundColor, imagePath }: Props) => {
  return (
    <Link className={styles.Tile} to={routes[name]} style={{ backgroundColor }}>
      {!!imagePath && <img className={styles.Icon} src={imagePath} alt="icon" />}
      <Typography variant="h6">{label}</Typography>
    </Link>
  );
};

export default Tile;

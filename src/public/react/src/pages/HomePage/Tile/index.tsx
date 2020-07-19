import React, { Suspense } from 'react';
import styles from './Tile.module.css';
import { Link } from 'react-router-dom';
import routes from 'util/routes';

export interface Props {
  name: string;
  label: string;
  icon?: string;
  description?: string;
  backgroundColor?: string;
}

const Tile: React.FC<Props> = ({ name, label, backgroundColor, icon }: Props) => {
  return (
    <Link className={styles.Tile} to={routes[name]} style={{ backgroundColor }}>
      {!!icon && <img className={styles.Icon} src={icon} alt="icon" />}
      <h5>{label}</h5>
    </Link>
  );
};

export default Tile;

import React from 'react';
import styles from './Tile.module.css';
import { Link } from 'react-router-dom';
import routes from 'util/routes';

export interface Props {
  name: string;
  label: string;
  description?: string;
  backgroundColor?: string;
}

const Tile: React.FC<Props> = ({ name, label, backgroundColor }: Props) => (
  <Link className={styles.Tile} to={routes[name]} style={{ backgroundColor }}>
    <h5>{label}</h5>
  </Link>
);

export default Tile;

import React from 'react';
import { Navbar } from 'react-bootstrap';
import routes, { linkTo } from 'util/routes';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/icons/logo.png';

import styles from './Header.module.css';
import LinkButton from '../LinkButton';

export interface Props {}

const Header: React.FC<Props> = () => {
  const location = useLocation();
  const isSkipboPage = location.pathname === routes.skipbo;
  return (
    <Navbar bg="light" expand="lg" className={styles.Header}>
      <Navbar.Brand>
        <Link to={linkTo.home()} className={styles.HomeLink}>
          <img className={styles.Logo} src={logo} alt="logo" />
        </Link>
      </Navbar.Brand>
      {isSkipboPage && (
        <LinkButton to={linkTo.skipboAddGame()} variant="outline-primary" type="button">
          Spiel hinzufügen
        </LinkButton>
      )}
    </Navbar>
  );
};

export default Header;

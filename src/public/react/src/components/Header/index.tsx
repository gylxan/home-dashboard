import React from 'react';
import { Navbar } from 'react-bootstrap';
import { linkTo } from 'util/routes';
import { Link } from 'react-router-dom';
import logo from '../../assets/icons/logo.png';

import styles from './Header.module.css';

export interface Props {}

const Header: React.FC<Props> = () => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand>
      <Link to={linkTo.home()} className={styles.HomeLink}>
        <img className={styles.Logo} src={logo} alt="logo" />
      </Link>
    </Navbar.Brand>
  </Navbar>
);

export default Header;

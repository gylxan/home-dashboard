import React, { useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import routes, { linkTo } from 'util/routes';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/icons/logo.png';

import styles from './Header.module.css';
import LinkButton from '../LinkButton';

export interface Props {}

const Header: React.FC<Props> = () => {
  const [isExpanded, setExpanded] = useState(false);
  const location = useLocation();
  const isSkipboPage = location.pathname === routes.skipbo;
  const isSkipboTablePage = location.pathname === routes.skipboTable;

  const collapse = (): void => setExpanded(false);
  const toggle = (): void => setExpanded(!isExpanded);

  return (
    <Navbar
      bg="light"
      expand="lg"
      className={styles.Header}
      expanded={isExpanded}
      onSelect={collapse}
      onToggle={toggle}
    >
      <Navbar.Brand>
        <Link to={linkTo.home()} className={styles.HomeLink}>
          <img className={styles.Logo} src={logo} alt="logo" />
        </Link>
      </Navbar.Brand>

      {(isSkipboPage || isSkipboTablePage) && (
        <>
          <Navbar.Toggle aria-controls="skipbo-navbar-nav" />
          <Navbar.Collapse id="skipbo-navbar-nav">
            <Nav>
              {isSkipboTablePage && (
                <Link className="nav-link" to={linkTo.skipbo()} onClick={collapse}>
                  Grafikübersicht
                </Link>
              )}
              {isSkipboPage && (
                <Link className="nav-link" to={linkTo.skipboTable()} onClick={collapse}>
                  Tabellenübersicht
                </Link>
              )}
            </Nav>
            <Nav className="ml-auto">
              <LinkButton to={linkTo.skipboAddGame()} variant="outline-primary" type="button" onClick={collapse}>
                Spiel hinzufügen
              </LinkButton>
            </Nav>
          </Navbar.Collapse>
        </>
      )}
    </Navbar>
  );
};

export default Header;

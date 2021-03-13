import React, { useState } from 'react';
import { Dropdown, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import routes, { linkTo } from 'util/routes';
import { Link, useHistory, useLocation } from 'react-router-dom';
import logo from '../../assets/icons/logo.png';

import LinkButton from '../LinkButton';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthUser } from '../../selectors/authSelectors';
import Icon from '../Icon';
import { actionLogout } from '../../actions/loginActions';
import classNames from 'classnames';

import styles from './Header.module.css';

const Header: React.FC = () => {
  const [isExpanded, setExpanded] = useState(false);
  const location = useLocation();
  const isSkipboPage = location.pathname === routes.skipbo;
  const isSkipboTablePage = location.pathname === routes.skipboTable;
  const isSubPageActionAvailable = isSkipboPage || isSkipboTablePage;
  const user = useSelector(getAuthUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const collapse = (callback?: () => void): void => {
    setExpanded(false);
    callback?.();
  };
  const toggle = (): void => setExpanded(!isExpanded);

  const renderUserMenu = () => {
    return (
      <Nav className={classNames({ 'ml-auto': !isSubPageActionAvailable })}>
        {!user ? (
          <Link className="nav-link" to={linkTo.login()} onClick={() => collapse()}>
            Login
          </Link>
        ) : (
          <>
            <NavDropdown title={<Icon icon={'user'} className={styles.UserIcon} />} id="user-nav-dropdown" alignRight>
              <NavDropdown.Item onClick={() => collapse(() => history.push(linkTo.user()))}>Profil</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => collapse(() => dispatch(actionLogout()))}>Logout</NavDropdown.Item>
            </NavDropdown>
          </>
        )}
      </Nav>
    );
  };

  return (
    <Navbar
      bg="light"
      expand="lg"
      className={styles.Header}
      expanded={isExpanded}
      onSelect={() => collapse()}
      onToggle={toggle}
    >
      <Navbar.Brand>
        <Link to={linkTo.home()} className={styles.HomeLink}>
          <img className={styles.Logo} src={logo} alt="logo" />
        </Link>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav" className={'ml-auto'}>
        {isSubPageActionAvailable && (
          <>
            <Nav>
              {isSkipboTablePage && (
                <Link className="nav-link" to={linkTo.skipbo()} onClick={() => collapse()}>
                  Grafikübersicht
                </Link>
              )}
              {isSkipboPage && (
                <Link className="nav-link" to={linkTo.skipboTable()} onClick={() => collapse()}>
                  Tabellenübersicht
                </Link>
              )}
            </Nav>
            <Nav className="ml-auto">
              <LinkButton
                to={linkTo.skipboAddGame()}
                variant="outline-primary"
                type="button"
                onClick={() => collapse()}
              >
                Spiel hinzufügen
              </LinkButton>
            </Nav>
          </>
        )}
        {isSubPageActionAvailable && !!user && <Dropdown.Divider />}
        {renderUserMenu()}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;

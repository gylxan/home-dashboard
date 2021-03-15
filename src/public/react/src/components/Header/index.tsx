import React from 'react';
import { linkTo } from 'util/routes';
import { useHistory } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '../IconButton';
import AppBar from '../AppBar';
import UserMenu from '../UserMenu';
import styles from './Header.module.css';

export interface Props {
  onMenuOpen: () => void;
}

const Header: React.FC<Props> = ({ onMenuOpen }) => {
  const history = useHistory();

  return (
    <AppBar position="sticky" className={styles.Header}>
      <AppBar.Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={onMenuOpen}>
          <MenuIcon />
        </IconButton>
        <IconButton color="inherit" onClick={() => history.push(linkTo.home())}>
          <HomeIcon />
        </IconButton>
        <UserMenu className={styles.UserMenu} />
      </AppBar.Toolbar>
    </AppBar>
  );
};

export default Header;

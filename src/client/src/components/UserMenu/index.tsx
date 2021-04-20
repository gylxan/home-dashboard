import React from 'react';

import styles from './UserMenu.module.css';
import LinkButton from '../LinkButton';
import { linkTo } from '../../util/routes';
import IconButton from '../IconButton';
import Menu from '../Menu';
import { actionLogout } from '../../actions/loginActions';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthUser } from '../../selectors/authSelectors';
import { useHistory } from 'react-router-dom';
import Icon from '../Icon';

export interface Props {
  className?: string;
}

const UserMenu: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(getAuthUser);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = !!anchorEl;

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={className}>
      {!user ? (
        <LinkButton to={linkTo.login()} variant="contained" color="primary">
          Login
        </LinkButton>
      ) : (
        <>
          <IconButton className={styles.UserIcon} onClick={handleUserMenuOpen} color="inherit">
            <Icon icon="account_circle" />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleUserMenuClose}
          >
            <Menu.Item
              onClick={() => {
                history.push(linkTo.user());
                handleUserMenuClose();
              }}
            >
              Profil
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                dispatch(actionLogout(user?.refreshToken ?? ''));
                handleUserMenuClose();
              }}
            >
              Logout
            </Menu.Item>
          </Menu>
        </>
      )}
    </div>
  );
};

export default UserMenu;

import React, { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { actionLogin, actionLogout } from '../../actions/loginActions';
import { getAuthError, getAuthUser, isAuthLoading } from '../../selectors/authSelectors';
import { useHistory } from 'react-router-dom';
import { setUser } from '../../util/localStorage';
import Page from '../../components/Page';
import Typography from '../../components/Typography';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import { linkTo } from '../../util/routes';

import styles from './LoginPage.module.css';

export interface Props {
  redirect?: boolean;
}

const LoginPage: React.FC<Props> = ({ redirect = true }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const authUser = useSelector(getAuthUser);
  const dispatch = useDispatch();
  const isAuthenticating = useSelector(isAuthLoading);
  const error = useSelector(getAuthError);
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const history = useHistory();

  useEffect(() => {
    dispatch(actionLogout(authUser?.refreshToken ?? ''));
  }, []);

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    dispatch(actionLogin(credentials.username, credentials.password)).then((action) => {
      if (!!action.payload.error) {
        usernameInputRef.current?.focus();
      } else {
        setUser(action.payload);
        redirect && history.push(linkTo.home());
      }
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setCredentials({ ...credentials, [event.currentTarget.name]: event.currentTarget.value });
  };

  return (
    <Page pageTitle="Anmeldung">
      <form className={styles.LoginForm} onSubmit={handleSubmit}>
        <Typography variant="h4">Login</Typography>
        <TextField
          name="username"
          variant="outlined"
          label="Benutzername"
          required
          value={credentials.username}
          autoFocus
          disabled={isAuthenticating}
          onChange={handleChange}
          autoComplete="username"
          error={!!error}
          fullWidth
          margin="normal"
        />
        <TextField
          name="password"
          variant="outlined"
          label="Password"
          required
          type="password"
          value={credentials.password}
          fullWidth
          disabled={isAuthenticating}
          onChange={handleChange}
          autoComplete="password"
          error={!!error}
          helperText={!!error && error.message}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={isAuthenticating}>
          {isAuthenticating ? 'Lade...' : 'Anmelden'}
        </Button>
      </form>
    </Page>
  );
};

export default LoginPage;

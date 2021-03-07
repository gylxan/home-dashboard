import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import styles from './LoginPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { actionLogin, actionLogout } from '../../actions/loginActions';
import { getAuthError, isAuthLoading } from '../../selectors/authSelectors';
import { useHistory } from 'react-router-dom';
import { setUser } from '../../util/localStorage';

export interface Props {
  redirect?: boolean;
}

const LoginPage: React.FC<Props> = ({ redirect = true }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const isAuthenticating = useSelector(isAuthLoading);
  const error = useSelector(getAuthError);
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const history = useHistory();

  useEffect(() => {
    dispatch(actionLogout());
  }, [dispatch]);

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    dispatch(actionLogin(username, password)).then((action) => {
      if (!!action.payload.error) {
        usernameInputRef.current?.focus();
      } else {
        setUser(action.payload);
        redirect && history.push('/');
      }
    });
  };

  return (
    <div>
      <Form className={styles.LoginForm} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Form.Group controlId="formUserName">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            ref={usernameInputRef}
            placeholder="Username"
            required
            value={username}
            isInvalid={!!error}
            onChange={(e) => setUsername(e.currentTarget.value)}
            disabled={isAuthenticating}
            autoFocus
          />
          {!!error && <Form.Control.Feedback type="invalid">{error.message}</Form.Control.Feedback>}
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            disabled={isAuthenticating}
          />
        </Form.Group>
        <Button type="submit" variant="primary" block disabled={isAuthenticating}>
          {isAuthenticating ? 'Lade...' : 'Anmelden'}
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;

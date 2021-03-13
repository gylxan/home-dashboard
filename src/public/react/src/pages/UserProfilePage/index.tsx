import React, { useState } from 'react';
import { withAuth } from '../../hocs/withAuth';

import { useDispatch, useSelector } from 'react-redux';
import { getAuthUser, isAuthLoading } from '../../selectors/authSelectors';
import { Button, Form, Spinner } from 'react-bootstrap';
import { actionUpdateUser } from '../../actions/userActions';
import Icon from '../../components/Icon';

import styles from './UserProfilePage.module.css';

const UserProfilePage: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const user = useSelector(getAuthUser);
  const isLoading = useSelector(isAuthLoading);
  const dispatch = useDispatch();

  const isFormValid = (): boolean =>
    !!newPassword && newPassword.trim() !== '' && !!newPasswordConfirmation && newPasswordConfirmation.trim() !== '';

  const handleSubmit = (event: React.FormEvent) => {
    setShowSuccess(false);
    setError('');
    event.preventDefault();
    event.stopPropagation();
    if (newPassword !== newPasswordConfirmation) {
      setError('Die Passwörter stimmen nicht überein');
      return;
    }

    dispatch(actionUpdateUser({ id: user?._id as string, password: newPassword })).then((action) => {
      if (!action.payload.error) {
        setNewPassword('');
        setNewPasswordConfirmation('');
        setShowSuccess(true);
      }
    });
  };

  return (
    <div>
      <h2>Hi {user?.username}!</h2>

      <h4 className={styles.SubTitle}>Passwort ändern</h4>
      <Form onSubmit={handleSubmit} className={styles.Form}>
        <Form.Group controlId="new_password">
          <Form.Label>Neues Passwort</Form.Label>
          <Form.Control
            required
            disabled={isLoading}
            value={newPassword}
            type="password"
            placeholder="Neues Passwort"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setShowSuccess(false);
              setNewPassword(e.currentTarget.value);
            }}
            autoComplete="new-password"
            isInvalid={!!error}
          />
        </Form.Group>
        <Form.Group controlId="new_password_confirmation">
          <Form.Label>Neues Passwort bestätigen</Form.Label>
          <Form.Control
            required
            disabled={isLoading}
            value={newPasswordConfirmation}
            type="password"
            placeholder="Neues Passwort bestätigen"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setShowSuccess(false);
              setNewPasswordConfirmation(e.currentTarget.value);
            }}
            autoComplete="new-password"
            isInvalid={!!error}
          />
          {!!error && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isLoading || !isFormValid()}>
          {isLoading ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Speichern...
            </>
          ) : showSuccess ? (
            <>
              <Icon icon="check" /> Gespeichert
            </>
          ) : (
            'Speichern'
          )}
        </Button>
      </Form>
    </div>
  );
};

export default withAuth(UserProfilePage);

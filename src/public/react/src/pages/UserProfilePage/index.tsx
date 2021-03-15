import React, { useState } from 'react';
import { withAuth } from '../../hocs/withAuth';

import { useDispatch, useSelector } from 'react-redux';
import { getAuthUser, isAuthLoading } from '../../selectors/authSelectors';
import { actionUpdateUser } from '../../actions/userActions';
import Icon from '../../components/Icon';
import Page from '../../components/Page';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import Spinner, {Size} from '../../components/Spinner';
import Typography from '../../components/Typography';
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
    <Page pageTitle="Profil">
      <h2>Hi {user?.username}!</h2>

      <form onSubmit={handleSubmit} className={styles.Form}>
        <Typography variant="h5">Passwort ändern</Typography>
        <TextField
          label="Neues Password"
          variant="outlined"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setShowSuccess(false);
            setNewPassword(e.currentTarget.value);
          }}
          type="password"
          required
          disabled={isLoading}
          autoComplete="new-password"
          error={!!error}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Neues Password bestätigen"
          variant="outlined"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setShowSuccess(false);
            setNewPasswordConfirmation(e.currentTarget.value);
          }}
          type="password"
          required
          disabled={isLoading}
          autoComplete="new-password"
          error={!!error}
          fullWidth
          helperText={!!error && error}
          margin="normal"
        />
        <Button
          startIcon={
            isLoading ? <Spinner size={Size.Small} color="inherit" /> : showSuccess ? <Icon icon="check_circle" /> : null
          }
          color="primary"
          type="submit"
          variant="contained"
          disabled={isLoading || !isFormValid()}
        >
          {isLoading ? 'Speichern...' : showSuccess ? <>Gespeichert</> : 'Speichern'}
        </Button>
      </form>
    </Page>
  );
};

export default withAuth(UserProfilePage);

import React from 'react';
import { useSelector } from 'react-redux';
import { getAuthUser } from '../selectors/authSelectors';
import LoginPage from '../pages/LoginPage';

export const withAuth = <P extends {}>(Component: React.ComponentType<P>): React.FC<P> => ({ ...props }: P) => {
  const user = useSelector(getAuthUser);
  return !user || !user.accessToken ? <LoginPage redirect={false} /> : <Component {...props} />;
};

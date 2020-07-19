import React, { useEffect } from 'react';
import { getPageTitle } from '../../util/routes';

//import styles from './EntscheidomatPage.module.css';

export interface Props {}

// TODO Implement me!
const EntscheidomatPage: React.FC<Props> = () => {
  useEffect(() => {
    document.title = getPageTitle('Entscheidomat');
  }, []);
  return <div className="EntscheidomatPage">Hier kommt der Entscheidomat hin!</div>;
};

export default EntscheidomatPage;

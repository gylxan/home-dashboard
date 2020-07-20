import React, { useEffect } from 'react';
import { getPageTitle } from '../../util/routes';
import Entscheidomat from '../../components/Entscheidomat';

//import styles from './EntscheidomatPage.module.css';

export interface Props {}

// TODO Implement me!
const EntscheidomatPage: React.FC<Props> = () => {
  useEffect(() => {
    document.title = getPageTitle('Entscheidomat');
  }, []);
  return (
    <div className="EntscheidomatPage">
      <Entscheidomat />
    </div>
  );
};

export default EntscheidomatPage;

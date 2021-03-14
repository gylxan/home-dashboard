import React from 'react';
import Entscheidomat from '../../components/Entscheidomat';
import Page from '../../components/Page';

//import styles from './EntscheidomatPage.module.css';

export interface Props {}

// TODO Implement me!
const EntscheidomatPage: React.FC<Props> = () => (
  <Page pageTitle={'Entscheidomat'} className="EntscheidomatPage">
    <Entscheidomat />
  </Page>
);

export default EntscheidomatPage;

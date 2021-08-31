import React, { useState } from 'react';
import Header from './components/Header';
import MainMenu from './components/MainMenu';

import styles from './App.module.css';
import Routes from './components/Routes';

// TODO
// 3. Put Map in on component
// 4. New Tile to control lights at home via hue
// 5. New Tile to play spotify
// 6. New Tile with calender entries of shared calender
// 7. ToDo List

function App() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  return (
    <div className={styles.App}>
      <Header onMenuOpen={() => setMenuOpen(true)} />
      <MainMenu open={isMenuOpen} onClose={() => setMenuOpen(false)} />
      <main className={styles.Main}>
        <Routes />
      </main>
    </div>
  );
}

export default App;

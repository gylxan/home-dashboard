import React, { useEffect, useState } from 'react';
import { getSkipboGames } from '../../util/apiclient';
import { SkipboGame } from '../../interfaces/skipboGame';
import { Button } from 'react-bootstrap';
import { linkTo } from '../../util/routes';
import { Link } from 'react-router-dom';


import styles from './SkipboOverviewPage.module.css';

function SkipboOverviewPage() {
  const [skipboGames, setSkipboGames] = useState([] as SkipboGame[]);

  useEffect(() => {
    getSkipboGames().then((data) => setSkipboGames(data));
  }, []);

  return (
    <div className="SkipboOverviewPage">
      <ul>
        {skipboGames.map((game) => (
          <li>{`${new Date(game.playTime).toLocaleString('de-DE')} - Gewinner: ${game.winner.name}`}</li>
        ))}
      </ul>
      <div className={styles.Footer}>
        <Link to={linkTo.skipboAddGame()}>
          <Button variant="primary" type="button">
            Spiel hinzufügen
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default SkipboOverviewPage;

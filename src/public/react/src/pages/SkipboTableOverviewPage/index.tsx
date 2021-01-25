import React, { useEffect, useState } from 'react';
import { Alert, Spinner, Table } from 'react-bootstrap';
import { getSkipboGames } from '../../util/apiclient';
import { SkipboGame } from '../../interfaces/skipboGame';
import { getPageTitle } from '../../util/routes';

import styles from './SkipboTableOverviewPage.module.css';
import { getFormattedDate } from '../../util/date';

function SkipboTableOverviewPage() {
  const [isLoading, setLoading] = useState(true);
  const [skipboGames, setSkipboGames] = useState([] as SkipboGame[]);

  useEffect(() => {
    document.title = getPageTitle('Skip-Bo');
    setLoading(true);
    getSkipboGames()
      .then((data) => setSkipboGames(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="SkipboTableOverviewPage">
      {isLoading ? (
        <div className={styles.LoadingSpinner}>
          <Spinner variant="secondary" as="span" animation="border" role="status" aria-hidden="true" />
        </div>
      ) : skipboGames.length === 0 ? (
        <Alert variant="primary">Füge ein Spiel hinzu, um Statistiken zu bekommen</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Zeitpunkt</th>
              <th>Gewinnername</th>
            </tr>
          </thead>
          <tbody>
            {skipboGames.map((game, index) => (
              <tr key={game.playTime}>
                <td>{skipboGames.length - index}</td>
                <td>{getFormattedDate(new Date(game.playTime))}</td>
                <td>{game.winner.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default SkipboTableOverviewPage;

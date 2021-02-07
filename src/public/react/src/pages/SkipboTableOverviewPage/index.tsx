import React, { useEffect, useState } from 'react';
import { Alert, Dropdown, Spinner, Table } from 'react-bootstrap';
import { deleteSkipboGame, getSkipboGames } from '../../util/apiclient';
import { SkipboGame } from '../../interfaces/skipboGame';
import { getPageTitle } from '../../util/routes';
import { getFormattedDate } from '../../util/date';
import Icon from '../../components/Icon';

import styles from './SkipboTableOverviewPage.module.css';

function SkipboTableOverviewPage() {
  const [isLoading, setLoading] = useState(true);
  const [skipboGames, setSkipboGames] = useState([] as SkipboGame[]);

  useEffect(() => {
    document.title = getPageTitle('Skip-Bo');
    setLoading(true);
    loadSkipboGames();
  }, []);

  const loadSkipboGames = (): Promise<void> => {
    return getSkipboGames()
      .then((data) => setSkipboGames(data))
      .finally(() => setLoading(false));
  };

  const deleteGame = (id: string): void => {
    setLoading(true);
    deleteSkipboGame(id).finally(loadSkipboGames);
  };

  return (
    <div className="SkipboTableOverviewPage">
      {isLoading && skipboGames.length === 0 ? (
        <div className={styles.LoadingSpinner}>
          <Spinner variant="secondary" as="span" animation="border" role="status" aria-hidden="true" />
        </div>
      ) : skipboGames.length === 0 ? (
        <Alert variant="primary">Füge ein Spiel hinzu, um Statistiken zu bekommen</Alert>
      ) : (
        <Table hover responsive>
          <thead>
            <tr>
              <th />
              <th>#</th>
              <th>Zeitpunkt</th>
              <th>Gewinnername</th>
            </tr>
          </thead>
          <tbody>
            {skipboGames.map((game, index) => (
              <tr key={game.playTime}>
                <td>
                  {isLoading ? (
                    <Icon icon="circle-notch" spin />
                  ) : (
                    <Dropdown>
                      <Dropdown.Toggle as={Icon} icon="ellipsis-v" clickable />
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => deleteGame(game._id as string)}>Löschen</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </td>
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

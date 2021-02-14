import React, { useEffect } from 'react';
import { Alert, Dropdown, Spinner, Table } from 'react-bootstrap';
import { SkipboGame } from '../../interfaces/skipboGame';
import { getPageTitle } from '../../util/routes';
import { getFormattedDate } from '../../util/date';
import Icon from '../../components/Icon';

import styles from './SkipboTableOverviewPage.module.css';
import { RootState } from '../../reducers';
import { getSkipboGames, isSkipboGamesLoading } from '../../selectors/skipboGamesSelectors';
import { deleteSkipboGame, fetchSkipboGames } from '../../actions/skipboGameActions';
import { connect } from 'react-redux';

export type Props = StateProps & DispatchProps;

function SkipboTableOverviewPage({ isLoading, games, fetchSkipboGames, deleteSkipboGame }: Props) {
  useEffect(() => {
    document.title = getPageTitle('Skip-Bo');
    fetchSkipboGames();
  }, [fetchSkipboGames]);

  return (
    <div className="SkipboTableOverviewPage">
      {isLoading && games.length === 0 ? (
        <div className={styles.LoadingSpinner}>
          <Spinner variant="secondary" as="span" animation="border" role="status" aria-hidden="true" />
        </div>
      ) : games.length === 0 ? (
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
            {games.map((game, index) => (
              <tr key={game.playTime}>
                <td>
                  {isLoading ? (
                    <Icon icon="circle-notch" spin />
                  ) : (
                    <Dropdown>
                      <Dropdown.Toggle as={Icon} icon="ellipsis-v" clickable />
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => deleteSkipboGame(game._id as string)}>Löschen</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </td>
                <td>{games.length - index}</td>
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

interface StateProps {
  games: SkipboGame[];
  isLoading: boolean;
}

interface DispatchProps {
  fetchSkipboGames: () => void;
  deleteSkipboGame: (id: string) => void;
}

const mapStateToProps = (state: RootState): StateProps => ({
  games: getSkipboGames(state),
  isLoading: isSkipboGamesLoading(state),
});

const mapDispatchToProps: DispatchProps = {
  fetchSkipboGames,
  deleteSkipboGame,
};

export default connect(mapStateToProps, mapDispatchToProps)(SkipboTableOverviewPage);

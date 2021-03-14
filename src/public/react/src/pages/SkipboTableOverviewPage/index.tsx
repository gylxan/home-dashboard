import React, { useEffect } from 'react';
import { SkipboGame } from '../../interfaces/skipboGame';
import { getPageTitle } from '../../util/routes';
import { getFormattedDate } from '../../util/date';
import Icon from '../../components/Icon';

import { RootState } from '../../reducers';
import { getSkipboGames, isSkipboGamesLoading } from '../../selectors/skipboGamesSelectors';
import { actionDeleteSkipboGame, actionFetchSkipboGames } from '../../actions/skipboGameActions';
import { connect, useSelector } from 'react-redux';
import { getAuthUser } from '../../selectors/authSelectors';
import Spinner from '../../components/Spinner';
import Alert from '../../components/Alert';
import Table from '../../components/Table';
import IconButton from 'components/IconButton';
import Menu from '../../components/Menu';
import styles from './SkipboTableOverviewPage.module.css';
import Page from "../../components/Page";

export type Props = StateProps & DispatchProps;

function SkipboTableOverviewPage({ isLoading, games, fetchSkipboGames, deleteSkipboGame }: Props) {
  const user = useSelector(getAuthUser);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(menuAnchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setMenuAnchorEl(null);
  };

  useEffect(() => {
    document.title = getPageTitle('Skip-Bo');
    fetchSkipboGames();
  }, [fetchSkipboGames]);

  return (
    <Page pageTitle="Skip-Bo" className="SkipboTableOverviewPage">
      {isLoading && games.length === 0 ? (
        <div className={styles.LoadingSpinner}>
          <Spinner />
        </div>
      ) : games.length === 0 ? (
        <Alert color="info">Füge ein Spiel hinzu, um Statistiken zu bekommen</Alert>
      ) : (
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.Cell />
              <Table.Cell>#</Table.Cell>
              <Table.Cell>Zeitpunkt</Table.Cell>
              <Table.Cell>Gewinnername</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {games.map((game, index) => (
              <Table.Row key={game._id ?? game.playTime}>
                <Table.Cell>
                  {isLoading ? (
                    <Icon icon="circle-notch" spin />
                  ) : (
                    !!user && (
                      <div>
                        <IconButton aria-haspopup="true" onClick={handleClick} size="small">
                          <Icon icon="ellipsis-v" size="xs" />
                        </IconButton>
                        <Menu anchorEl={menuAnchorEl} keepMounted open={open} onClose={handleClose}>
                          <Menu.Item onClick={() => deleteSkipboGame(game._id as string)}>Löschen</Menu.Item>
                        </Menu>
                      </div>
                    )
                  )}
                </Table.Cell>
                <Table.Cell>{games.length - index}</Table.Cell>
                <Table.Cell>{getFormattedDate(new Date(game.playTime))}</Table.Cell>
                <Table.Cell>{game.winner.name}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </Page>
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
  fetchSkipboGames: actionFetchSkipboGames,
  deleteSkipboGame: actionDeleteSkipboGame,
};

export default connect(mapStateToProps, mapDispatchToProps)(SkipboTableOverviewPage);

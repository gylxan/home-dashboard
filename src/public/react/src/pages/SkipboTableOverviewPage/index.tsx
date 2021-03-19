import React, { useEffect } from 'react';
import { getPageTitle } from '../../util/routes';
import { getFormattedDate } from '../../util/date';
import Icon from '../../components/Icon';
import { getSkipboGames, isSkipboGamesLoading } from '../../selectors/skipboGamesSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthUser } from '../../selectors/authSelectors';
import Spinner, { Size } from '../../components/Spinner';
import Alert from '../../components/Alert';
import Table from '../../components/Table';
import IconButton from 'components/IconButton';
import Menu from '../../components/Menu';
import Page from '../../components/Page';
import { actionDeleteSkipboGame, actionFetchSkipboGames } from '../../actions/skipboGameActions';
import styles from './SkipboTableOverviewPage.module.css';

function SkipboTableOverviewPage() {
  const user = useSelector(getAuthUser);
  const games = useSelector(getSkipboGames);
  const isLoading = useSelector(isSkipboGamesLoading);
  const dispatch = useDispatch();

  const [menuAnchorEl, setMenuAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [currentGameId, setCurrentGameId] = React.useState<string | null>(null);
  const open = Boolean(menuAnchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
    setCurrentGameId(event.currentTarget.value);
  };

  const handleClose = () => {
    setMenuAnchorEl(null);
    setCurrentGameId(null);
  };

  useEffect(() => {
    document.title = getPageTitle('Skip-Bo');
    dispatch(actionFetchSkipboGames());
  }, [dispatch]);

  return (
    <Page pageTitle="Skip-Bo" className="SkipboTableOverviewPage">
      {isLoading && games.length === 0 ? (
        <div className={styles.LoadingSpinner}>
          <Spinner />
        </div>
      ) : games.length === 0 ? (
        <Alert color="info">Füge ein Spiel hinzu, um Statistiken zu bekommen</Alert>
      ) : (
        <>
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
                      <Spinner size={Size.Small} />
                    ) : (
                      !!user && (
                        <div>
                          <IconButton aria-haspopup="true" onClick={handleClick} size="small" value={game._id}>
                            <Icon icon="more_vert" />
                          </IconButton>
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
          <Menu anchorEl={menuAnchorEl} keepMounted open={open} onClose={handleClose}>
            <Menu.Item
              onClick={() => {
                dispatch(actionDeleteSkipboGame(currentGameId as string));
                handleClose();
              }}
            >
              Löschen
            </Menu.Item>
          </Menu>
        </>
      )}
    </Page>
  );
}
export default SkipboTableOverviewPage;

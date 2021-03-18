import React, { useEffect } from 'react';
import GeneralStatisticCard from '../../components/GeneralStatisticCard';
import PieChartStatisticCard from '../../components/PieChartStatisticCard';
import ColumnStatisticCard from '../../components/ColumnStatisticCard';

import LineChartStatisticCard from '../../components/LineChartStatisticCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSkipboGames,
  getSkipboGamesHistory,
  getSkipboGamesPerWinnerStatistics,
  getSkipboGamesStatisticsGeneral,
  getSkipboGamesTopWinners,
  getSkipboLastPlayDayGames,
  isSkipboGamesLoading,
} from '../../selectors/skipboGamesSelectors';
import {
  actionFetchSkipboGames,
  actionFetchSkipboGamesHistory,
  actionFetchSkipboGamesPerWinnerStatistics,
  actionFetchSkipboGameStatisticsGeneral,
  actionFetchSkipboLastPlayDayGames,
} from '../../actions/skipboGameActions';

import Spinner from '../../components/Spinner';
import Alert from '../../components/Alert';
import Page from '../../components/Page';
import styles from './SkipboOverviewPage.module.css';
import FloatingActionButton from '../../components/FloatingActionButton';
import Icon from '../../components/Icon';
import { makeStyles } from '@material-ui/core';
import { linkTo } from '../../util/routes';
import { useHistory } from 'react-router-dom';
import { getAuthUser } from '../../selectors/authSelectors';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export function SkipboOverviewPage() {
  const classes = useStyles();
  const history = useHistory();
  const authUser = useSelector(getAuthUser);
  const dispatch = useDispatch();
  const games = useSelector(getSkipboGames);
  const isLoading = useSelector(isSkipboGamesLoading);

  useEffect(() => {
    dispatch(actionFetchSkipboGames());
  }, [dispatch]);

  const generalStatistic = useSelector(getSkipboGamesStatisticsGeneral);
  const skipboTopWinners = useSelector(getSkipboGamesTopWinners);
  const skipboLastPlayDayGames = useSelector(getSkipboLastPlayDayGames);
  const skipboGamesPerWinner = useSelector(getSkipboGamesPerWinnerStatistics);
  const skipboGamesHistory = useSelector(getSkipboGamesHistory);

  return (
    <Page pageTitle="Skip-Bo" className="SkipboOverviewPage">
      <div className={styles.Content}>
        {games.length === 0 ? (
          isLoading ? (
            <div className={styles.LoadingSpinner}>
              <Spinner />
            </div>
          ) : (
            <Alert severity="info">Füge ein Spiel hinzu, um Statistiken zu bekommen</Alert>
          )
        ) : (
          <div className={styles.Cards}>
            <GeneralStatisticCard
              title={'Allgemein'}
              fetchData={() => dispatch(actionFetchSkipboGameStatisticsGeneral())}
              data={generalStatistic}
            />
            <ColumnStatisticCard
              title="Top 5 Spieler"
              yAxisTitle="Gewonnene Spiele"
              seriesName="Spiele"
              fetchData={() => dispatch(actionFetchSkipboGamesPerWinnerStatistics())}
              data={skipboTopWinners}
            />
            <LineChartStatisticCard
              title="Spiele des letztes Spieltags"
              fetchData={() => dispatch(actionFetchSkipboLastPlayDayGames())}
              yAxisTitle="Anzahl Gewinne"
              data={skipboLastPlayDayGames}
            />
            <PieChartStatisticCard
              title={'Gewonnene Spiele pro Spieler/in'}
              fetchData={() => dispatch(actionFetchSkipboGamesPerWinnerStatistics())}
              data={skipboGamesPerWinner}
            />
            <LineChartStatisticCard
              title="Spieleverlauf"
              fetchData={() => dispatch(actionFetchSkipboGamesHistory())}
              data={skipboGamesHistory}
              yAxisTitle="Anzahl Gewinne"
            />
          </div>
        )}
        {!!authUser && (
          <FloatingActionButton className={classes.fab} onClick={() => history.push(linkTo.skipboAddGame())}>
            <Icon icon="add" />
          </FloatingActionButton>
        )}
      </div>
    </Page>
  );
}

export default SkipboOverviewPage;

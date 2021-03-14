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
import Grid from 'components/Grid';
import styles from './SkipboOverviewPage.module.css';
import Page from '../../components/Page';

export function SkipboOverviewPage() {
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

  const renderGridItem = (node: React.ReactNode): React.ReactNode => (
    <Grid item xs={12} sm={6} md={4}>
      {node}
    </Grid>
  );

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
          <Grid container direction="row" spacing={3}>
            {renderGridItem(
              <GeneralStatisticCard
                title={'Allgemein'}
                fetchData={() => dispatch(actionFetchSkipboGameStatisticsGeneral())}
                data={generalStatistic}
              />,
            )}
            {renderGridItem(
              <ColumnStatisticCard
                title="Top 5 Spieler"
                yAxisTitle="Gewonnene Spiele"
                seriesName="Spiele"
                fetchData={() => dispatch(actionFetchSkipboGamesPerWinnerStatistics())}
                data={skipboTopWinners}
              />,
            )}
            {renderGridItem(
              <LineChartStatisticCard
                title="Spiele des letztes Spieltags"
                fetchData={() => dispatch(actionFetchSkipboLastPlayDayGames())}
                yAxisTitle="Anzahl Gewinne"
                data={skipboLastPlayDayGames}
              />,
            )}
            {renderGridItem(
              <PieChartStatisticCard
                title={'Gewonnene Spiele pro Spieler/in'}
                fetchData={() => dispatch(actionFetchSkipboGamesPerWinnerStatistics())}
                data={skipboGamesPerWinner}
              />,
            )}
            {renderGridItem(
              <LineChartStatisticCard
                title="Spieleverlauf"
                fetchData={() => dispatch(actionFetchSkipboGamesHistory())}
                data={skipboGamesHistory}
                yAxisTitle="Anzahl Gewinne"
              />,
            )}
          </Grid>
        )}
      </div>
    </Page>
  );
}

export default SkipboOverviewPage;

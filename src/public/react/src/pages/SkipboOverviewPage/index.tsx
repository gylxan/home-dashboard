import React, { useEffect } from 'react';
import { Alert, CardColumns, Spinner } from 'react-bootstrap';
import { getPageTitle } from '../../util/routes';
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

import styles from './SkipboOverviewPage.module.css';

export function SkipboOverviewPage() {
  const dispatch = useDispatch();
  const games = useSelector(getSkipboGames);
  const isLoading = useSelector(isSkipboGamesLoading);

  useEffect(() => {
    document.title = getPageTitle('Skip-Bo');
    dispatch(actionFetchSkipboGames());
  }, [dispatch]);

  const generalStatistic = useSelector(getSkipboGamesStatisticsGeneral);
  const skipboTopWinners = useSelector(getSkipboGamesTopWinners);
  const skipboLastPlayDayGames = useSelector(getSkipboLastPlayDayGames);
  const skipboGamesPerWinner = useSelector(getSkipboGamesPerWinnerStatistics);
  const skipboGamesHistory = useSelector(getSkipboGamesHistory);

  return (
    <div className="SkipboOverviewPage">
      <div className={styles.Content}>
        {games.length === 0 ? (
          isLoading ? (
            <div className={styles.LoadingSpinner}>
              <Spinner variant="secondary" as="span" animation="border" role="status" aria-hidden="true" />
            </div>
          ) : (
            <Alert variant="primary">Füge ein Spiel hinzu, um Statistiken zu bekommen</Alert>
          )
        ) : (
          <CardColumns>
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
          </CardColumns>
        )}
      </div>
    </div>
  );
}

export default SkipboOverviewPage;

import React, { useEffect, useState } from 'react';
import { Alert, CardColumns, Spinner } from 'react-bootstrap';
import {
  getSkipboGames,
  getSkipboGamesHistory,
  getSkipboGamesPerWinnerStatistics,
  getSkipboGameStatisticsGeneral,
  getSkipboLastPlayDayGames,
  getSkipboTopWinners,
} from '../../util/apiclient';
import { SkipboGame } from '../../interfaces/skipboGame';
import { getPageTitle, linkTo } from '../../util/routes';
import GeneralStatisticCard from '../../components/GeneralStatisticCard';
import PieChartStatisticCard from '../../components/PieChartStatisticCard';
import ColumnStatisticCard from '../../components/ColumnStatisticCard';

import styles from './SkipboOverviewPage.module.css';
import LineChartStatisticCard from '../../components/LineChartStatisticCard';
import LinkButton from '../../components/LinkButton';

function SkipboOverviewPage() {
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
    <div className="SkipboOverviewPage">
      <div className={styles.Content}>
        {isLoading ? (
          <div className={styles.LoadingSpinner}>
            <Spinner variant="secondary" as="span" animation="border" role="status" aria-hidden="true" />
          </div>
        ) : skipboGames.length === 0 ? (
          <Alert variant="primary">Füge ein Spiel hinzu, um Statistiken zu bekommen</Alert>
        ) : (
          <CardColumns>
            <GeneralStatisticCard title={'Allgemein'} fetchData={getSkipboGameStatisticsGeneral} />
            <ColumnStatisticCard
              title="Top 5 Spieler"
              yAxisTitle="Gewonnene Spiele"
              seriesName="Spiele"
              fetchData={getSkipboTopWinners}
            />
            <LineChartStatisticCard
              title="Spiele des letztes Spieltags"
              fetchData={getSkipboLastPlayDayGames}
              yAxisTitle="Anzahl Gewinne"
            />
            <PieChartStatisticCard
              title={'Gewonnene Spiele pro Spieler/in'}
              fetchData={getSkipboGamesPerWinnerStatistics}
            />
            <LineChartStatisticCard
              title="Spieleverlauf"
              fetchData={getSkipboGamesHistory}
              yAxisTitle="Anzahl Gewinne"
            />
          </CardColumns>
        )}
      </div>
      <div className={styles.Footer}>
        <LinkButton to={linkTo.skipboAddGame()} variant="primary" type="button">
          Spiel hinzufügen
        </LinkButton>
      </div>
    </div>
  );
}

export default SkipboOverviewPage;

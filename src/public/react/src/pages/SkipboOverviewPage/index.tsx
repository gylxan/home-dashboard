import React, { useEffect, useState } from 'react';
import { Button, CardColumns, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  getSkipboGames,
  getSkipboGamesPerWinnerStatistics,
  getSkipboGameStatisticsGeneral,
  getSkipboGameWinners,
  getTopWinners,
} from '../../util/apiclient';
import { SkipboGame } from '../../interfaces/skipboGame';
import { getPageTitle, linkTo } from '../../util/routes';
import GeneralStatisticCard from '../../components/GeneralStatisticCard';

import styles from './SkipboOverviewPage.module.css';
import PieChartStatisticCard from '../../components/PieChartStatisticCard';
import ColumnStatisticCard from '../../components/ColumnStatisticCard';

// TODO Handle the case, when there are no data
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
            <PieChartStatisticCard title={'Spiele pro Gewinner'} fetchData={getSkipboGamesPerWinnerStatistics} />
            <ColumnStatisticCard
              title="Top 5 Gewinner"
              yAxisTitle="Gewonnene Spiele"
              seriesName="Spiele"
              fetchData={getTopWinners}
            />
          </CardColumns>
        )}
      </div>
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

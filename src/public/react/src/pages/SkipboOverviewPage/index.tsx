import React, { useEffect, useState } from 'react';
import { Button, CardColumns } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  getSkipboGames,
  getSkipboGamesPerWinnerStatistics,
  getSkipboGameStatisticsGeneral,
  getSkipboGameWinners, getTopWinners,
} from '../../util/apiclient';
import { SkipboGame } from '../../interfaces/skipboGame';
import { getPageTitle, linkTo } from '../../util/routes';
import GeneralStatisticCard from '../../components/GeneralStatisticCard';

import styles from './SkipboOverviewPage.module.css';
import PieChartStatisticCard from '../../components/PieChartStatisticCard';
import ColumnStatisticCard from '../../components/ColumnStatisticCard';

function SkipboOverviewPage() {
  const [skipboGames, setSkipboGames] = useState([] as SkipboGame[]);

  useEffect(() => {
    document.title = getPageTitle('Skip-Bo');
    getSkipboGames().then((data) => setSkipboGames(data));
  }, []);

  return (
    <div className="SkipboOverviewPage">
      <div className={styles.Content}>
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
        {/*<ul>*/}
        {/*  {skipboGames.map((game) => (*/}
        {/*    <li key={game.playTime}>{`${new Date(game.playTime).toLocaleString('de-DE')} - Gewinner: ${*/}
        {/*      game.winner.name*/}
        {/*    }`}</li>*/}
        {/*  ))}*/}
        {/*</ul>*/}
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

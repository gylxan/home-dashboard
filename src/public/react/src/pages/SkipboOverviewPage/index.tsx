import React, { useEffect } from 'react';
import { Alert, CardColumns, Spinner } from 'react-bootstrap';
import {
  getSkipboGamesHistory,
  getSkipboGamesPerWinnerStatistics,
  getSkipboGameStatisticsGeneral,
  getSkipboLastPlayDayGames,
  getSkipboTopWinners,
} from '../../util/apiclient';
import { SkipboGame } from '../../interfaces/skipboGame';
import { getPageTitle } from '../../util/routes';
import GeneralStatisticCard from '../../components/GeneralStatisticCard';
import PieChartStatisticCard from '../../components/PieChartStatisticCard';
import ColumnStatisticCard from '../../components/ColumnStatisticCard';

import styles from './SkipboOverviewPage.module.css';
import LineChartStatisticCard from '../../components/LineChartStatisticCard';
import { RootState } from '../../reducers';
import { connect } from 'react-redux';
import { getSkipboGames, isSkipboGamesLoading } from '../../selectors/skipboGamesSelectors';
import { fetchSkipboGames } from '../../actions/skipboGameActions';

export type Props = StateProps & DispatchProps;

export function SkipboOverviewPage({ games, isLoading, fetchSkipboGames }: Props) {
  useEffect(() => {
    document.title = getPageTitle('Skip-Bo');
    fetchSkipboGames();
  }, [fetchSkipboGames]);

  return (
    <div className="SkipboOverviewPage">
      <div className={styles.Content}>
        {isLoading ? (
          <div className={styles.LoadingSpinner}>
            <Spinner variant="secondary" as="span" animation="border" role="status" aria-hidden="true" />
          </div>
        ) : games.length === 0 ? (
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
    </div>
  );
}

interface StateProps {
  games: SkipboGame[];
  isLoading: boolean;
}

interface DispatchProps {
  fetchSkipboGames: () => void;
}

const mapStateToProps = (state: RootState): StateProps => ({
  games: getSkipboGames(state),
  isLoading: isSkipboGamesLoading(state),
});

const mapDispatchToProps: DispatchProps = {
  fetchSkipboGames,
};

export default connect(mapStateToProps, mapDispatchToProps)(SkipboOverviewPage);

import React, { useEffect, useState } from 'react';
import { linkTo } from '../../util/routes';
import { useHistory } from 'react-router-dom';

import LinkButton from '../../components/LinkButton';
import DateTimePicker from '../../components/DateTimePicker';

import { getSkipboGameWinners, isSkipboGamesLoading } from '../../selectors/skipboGamesSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { actionAddSkipboGame, actionFetchSkipboGameWinners } from '../../actions/skipboGameActions';
import { withAuth } from '../../hocs/withAuth';
import Page from '../../components/Page';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner/Spinner';
import { Autocomplete } from '@material-ui/lab';
import styles from './SkipboAddGamePage.module.css';
import Typography from "../../components/Typography";

function SkipboOverviewPage() {
  const [selectedWinner, setSelectedWinner] = useState('');
  const [playTime, setPlayTime] = useState(new Date());
  const history = useHistory();
  const isLoading = useSelector(isSkipboGamesLoading);
  const winners = useSelector(getSkipboGameWinners);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionFetchSkipboGameWinners()).then((action) => {
      !!action.payload?.length && setSelectedWinner(action.payload[0]);
    });
  }, [dispatch]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(
      actionAddSkipboGame({
        playTime: playTime.toISOString(),
        winner: { name: selectedWinner },
      }),
    ).then((action) => {
      if (!action.payload.error) {
        history.push(linkTo.skipbo());
      }
    });
  };

  const isFormValid = (): boolean => !!selectedWinner && selectedWinner.trim() !== '' && !!playTime;

  return (
    <Page pageTitle="Skip-Bo" className="SkipboAddGamePage">
      <form className={styles.Form} onSubmit={handleSubmit}>
        <Typography variant="h5">Spiel hinzufügen</Typography>
        <Autocomplete
          freeSolo
          fullWidth
          renderInput={(params) => <TextField {...params} label="Gewinner" variant="outlined" />}
          options={winners}
          onChange={(e, value) => setSelectedWinner(value as string)}
          disabled={isLoading}
        />
        <DateTimePicker
          variant="inline"
          inputVariant="outlined"
          label="Spielzeitpunkt"
          onChange={(e) => setPlayTime(e as Date)}
          value={playTime}
          disablePast
          format="dd.MM.yyyy HH:mm"
          showTodayButton
          margin="normal"
          fullWidth
          disabled={isLoading}
        />

        <div className={styles.ButtonControlBar}>
          <LinkButton to={linkTo.skipbo()} color="secondary" variant="contained" type="button" disabled={isLoading}>
            Zurück
          </LinkButton>
          <Button
            startIcon={isLoading && <Spinner size="1rem" color="inherit" />}
            variant="contained"
            color="primary"
            type="submit"
            disabled={isLoading || !isFormValid()}
          >
            {isLoading ? 'Lade...' : 'Hinzufügen'}
          </Button>
        </div>
      </form>
    </Page>
  );
}

export default withAuth(SkipboOverviewPage);

import React, { useState } from 'react';
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
import Spinner, { Size } from '../../components/Spinner';
import { Autocomplete } from '@material-ui/lab';
import Typography from '../../components/Typography';
import styles from './SkipboAddGamePage.module.css';
import { useComponentDidMount } from '../../hocs/useComponentDidMount';
import { watchPosition } from '../../util/geoLocation';

function SkipboOverviewPage() {
  const [selectedWinner, setSelectedWinner] = useState('');
  const [playTime, setPlayTime] = useState(new Date());
  const [geoLocation, setGeoLocation] = useState(undefined as GeolocationPosition | undefined);
  const [geoLocationError, setGeoLocationError] = useState(undefined as string | undefined);
  const history = useHistory();
  const isLoading = useSelector(isSkipboGamesLoading);
  const winners = useSelector(getSkipboGameWinners);

  const dispatch = useDispatch();

  useComponentDidMount(() => {
    dispatch(actionFetchSkipboGameWinners());

    watchPosition(setGeoLocation, (error) => !!error && setGeoLocationError(error.message));
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(
      actionAddSkipboGame({
        playTime: playTime.toISOString(),
        winner: { name: selectedWinner },
        location: {
          latitude: geoLocation?.coords.latitude ?? 0,
          longitude: geoLocation?.coords.longitude ?? 0,
        },
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
          value={selectedWinner}
          freeSolo
          fullWidth
          renderInput={(params) => (
            <TextField
              {...params}
              margin="normal"
              label="Gewinner"
              variant="outlined"
              onChange={(e) => {
                setSelectedWinner(e.currentTarget.value as string);
              }}
            />
          )}
          options={winners}
          onChange={(e, value) => {
            setSelectedWinner(value as string);
          }}
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
          margin="normal"
          fullWidth
          disabled={isLoading}
        />

        <TextField
          className={styles.Location}
          value={
            !geoLocation
              ? !!geoLocationError
                ? geoLocationError
                : 'Geo Position wird ermittelt...'
              : `Latitude: ${geoLocation.coords.latitude}, Longitude: ${geoLocation.coords.longitude}`
          }
          margin="normal"
          label="Geo Position"
          variant="outlined"
          error={!!geoLocationError}
          disabled
          fullWidth
        />

        <div className={styles.ButtonControlBar}>
          <LinkButton to={linkTo.skipbo()} color="secondary" variant="contained" type="button" disabled={isLoading}>
            Zurück
          </LinkButton>
          <Button
            startIcon={isLoading && <Spinner size={Size.Small} color="inherit" />}
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

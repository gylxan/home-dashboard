import React, { useEffect, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { linkTo } from '../../util/routes';
import { useHistory } from 'react-router-dom';

import LinkButton from '../../components/LinkButton';
import DateTimePicker from '../../components/DateTimePicker';

import { getSkipboGameWinners, isSkipboGamesLoading } from '../../selectors/skipboGamesSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { actionAddSkipboGame, actionFetchSkipboGameWinners } from '../../actions/skipboGameActions';
import styles from './SkipboAddGamePage.module.css';
import { withAuth } from '../../hocs/withAuth';

const NEW_WINNER = '-1';

function SkipboOverviewPage() {
  const [selectedWinner, setSelectedWinner] = useState(NEW_WINNER);
  const [insertedWinner, setInsertedWinner] = useState('');
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
        winner: { name: selectedWinner === NEW_WINNER ? insertedWinner : selectedWinner },
      }),
    ).then((action) => {
      if (!action.payload.error) {
        history.push(linkTo.skipbo());
      }
    });
  };

  const handleSelectedWinnerChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = e.currentTarget.value;
    setSelectedWinner(value);
  };

  const handlePlayTimeChange = (date: Date): void => {
    setPlayTime(date);
  };

  const isFormValid = (): boolean => {
    return selectedWinner !== NEW_WINNER || (selectedWinner === NEW_WINNER && insertedWinner.trim() !== '');
  };

  return (
    <div className="SkipboAddGamePage">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="winner">
          <Form.Label>Gewinner</Form.Label>
          {isLoading ||
            (winners.length >= 1 && selectedWinner !== NEW_WINNER && (
              <Form.Control autoFocus required value={selectedWinner} as="select" onChange={handleSelectedWinnerChange}>
                {winners.map((winner: string) => (
                  <option key={winner} value={winner}>
                    {winner}
                  </option>
                ))}
                <option key={'new-winner'} value={NEW_WINNER}>
                  Gewinner eingeben...
                </option>
              </Form.Control>
            ))}
          {(winners.length === 0 || selectedWinner === NEW_WINNER) && !isLoading && (
            <Form.Control
              autoFocus
              required
              value={insertedWinner}
              type="text"
              placeholder="Gebe den Gewinner ein"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInsertedWinner(e.currentTarget.value)}
            />
          )}
        </Form.Group>
        <Form.Group controlId="playTime">
          <Form.Label>Spielzeitpunkt</Form.Label>
          <Form.Group>
            <DateTimePicker onChange={handlePlayTimeChange} selected={playTime} />
          </Form.Group>
        </Form.Group>
        <div className={styles.ButtonControlBar}>
          <LinkButton to={linkTo.skipbo()} variant="secondary" type="button" disabled={isLoading}>
            Zurück
          </LinkButton>
          <Button variant="primary" type="submit" disabled={isLoading || !isFormValid()}>
            {isLoading ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Lade...
              </>
            ) : (
              'Hinzufügen'
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default withAuth(SkipboOverviewPage);

import React, { useEffect, useState } from 'react';
import { addSkipboGame, getSkipboGameWinners } from '../../util/apiclient';
import { Button, Form, Spinner } from 'react-bootstrap';
import { linkTo } from '../../util/routes';
import { useHistory } from 'react-router-dom';

import LinkButton from '../../components/LinkButton';
import DateTimePicker from '../../components/DateTimePicker';

import styles from './SkipboAddGamePage.module.css';

const NEW_WINNER = '-1';
function SkipboOverviewPage() {
  const [selectedWinner, setSelectedWinner] = useState(NEW_WINNER);
  const [insertedWinner, setInsertedWinner] = useState('');
  const [playTime, setPlayTime] = useState(new Date());
  const [winners, setWinners] = useState([] as string[]);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingWinners, setLoadingWinners] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setLoadingWinners(true);
    getSkipboGameWinners()
      .then((winners: string[]) => {
        setWinners(winners);
        winners.length >= 1 && setSelectedWinner(winners[0]);
      })
      .finally(() => setLoadingWinners(false));
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setLoading(true);
    addSkipboGame({
      playTime: playTime.toISOString(),
      winner: { name: selectedWinner === NEW_WINNER ? insertedWinner : selectedWinner },
    }).then(() => {
      setLoading(false);
      history.push(linkTo.skipbo());
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
          {isLoadingWinners ||
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
          {(winners.length === 0 || selectedWinner === NEW_WINNER) && !isLoadingWinners && (
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

export default SkipboOverviewPage;

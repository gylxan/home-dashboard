import React, { useEffect, useState } from 'react';
import { addSkipboGame, getSkipboGameWinners } from '../../util/apiclient';
import { Button, Form, Spinner } from 'react-bootstrap';
import { linkTo } from '../../util/routes';
import { useHistory } from 'react-router-dom';

import styles from './SkipboAddGamePage.module.css';
import { getCurrentDateTimeForHtml } from '../../util/dateTime';

const NEW_WINNER = '-1';
function SkipboOverviewPage() {
  const [selectedWinner, setSelectedWinner] = useState(NEW_WINNER);
  const [insertedWinner, setInsertedWinner] = useState('');
  const [playTime, setPlayTime] = useState(getCurrentDateTimeForHtml());
  const [winners, setWinners] = useState([] as string[]);
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    getSkipboGameWinners().then((winners: string[]) => {
      setWinners(winners);
      winners.length >= 1 && setSelectedWinner(winners[0]);
    });
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setLoading(true);
    addSkipboGame({
      playTime: +new Date(playTime),
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

  const handlePlayTimeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.currentTarget.value;
    setPlayTime(value);
  };

  const isFormValid = (): boolean => {
    return (
      (selectedWinner !== NEW_WINNER || (selectedWinner === NEW_WINNER && insertedWinner.trim() !== '')) &&
      playTime !== '' &&
      +new Date(playTime) > 0
    );
  };

  return (
    <div className="SkipboAddGamePage">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="winner">
          <Form.Label>Gewinner</Form.Label>
          {winners.length >= 1 && selectedWinner !== NEW_WINNER && (
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
          )}
          {(winners.length === 0 || selectedWinner === NEW_WINNER) && (
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
          <Form.Control
            type="datetime-local"
            value={playTime}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePlayTimeChange(e)}
          />
        </Form.Group>
        <div className={styles.ButtonControlBar}>
          <Button variant="secondary" type="submit" disabled={isLoading} onClick={() => linkTo.skipbo()}>
            Zurück
          </Button>
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

import React, { useEffect, useState } from 'react';
import { addSkipboGame, getSkipboGameWinners } from '../../util/apiclient';
import { Button, Form, Spinner } from 'react-bootstrap';
import { linkTo } from '../../util/routes';
import { useHistory } from 'react-router-dom';


const NEW_WINNER = '-1';
function SkipboOverviewPage() {
  const [selectedWinner, setSelectedWinner] = useState(NEW_WINNER);
  const [insertedWinner, setInsertedWinner] = useState('');
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
    addSkipboGame({ name: selectedWinner === NEW_WINNER ? insertedWinner : selectedWinner }).then(() => {
      setLoading(false);
      history.push(linkTo.skipbo());
    });
  };

  const handleSelectedWinnerChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = e.currentTarget.value;
    setSelectedWinner(value);
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
        <Button
          variant="primary"
          type="submit"
          disabled={isLoading || (selectedWinner === NEW_WINNER && insertedWinner.trim() === '')}
        >
          {isLoading ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Lade...
            </>
          ) : (
            'Hinzufügen'
          )}
        </Button>
      </Form>
    </div>
  );
}

export default SkipboOverviewPage;

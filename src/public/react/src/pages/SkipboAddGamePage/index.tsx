import React, { useState } from 'react';
import { addSkipboGame } from '../../util/apiclient';
import { Button, Form, Spinner } from 'react-bootstrap';
import { linkTo } from '../../util/routes';
import { useHistory } from 'react-router-dom';

function SkipboOverviewPage() {
  const [winner, setWinner] = useState('');
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setLoading(true);
    addSkipboGame({ name: winner }).then(() => {
      setLoading(false);
      history.push(linkTo.skipbo());
    });
  };

  return (
    <div className="SkipboAddGamePage">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="winner">
          <Form.Label>Gewinner</Form.Label>
          <Form.Control
            autoFocus
            required
            value={winner}
            type="text"
            placeholder="Gebe den Gewinner ein"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWinner(e.currentTarget.value)}
          />
          {/*TODO Use a select here and select from already entered players. Also add the option to create a new user*/}
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isLoading}>
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

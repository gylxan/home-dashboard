import React, { useEffect, useState } from 'react';
import { getBoards } from '../../util/apiclient';
import { Board } from '../../interfaces/board';
import { Spinner, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import routes from 'util/routes';

function HomePage() {
  const [isLoading, setLoading] = useState(true);
  const [boards, setBoards] = useState([] as Board[]);

  useEffect(() => {
    getBoards().then((data) => {
      setBoards(data);
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Spinner animation="border" variant="danger" />;
  }

  return (
    <div className="HomePage">
      {boards.map((board) => (
        <Card style={{ width: '18rem' }} key={board.name}>
          <Card.Body>
            <Card.Title>{board.label}</Card.Title>
            <Card.Text>{board.description}</Card.Text>
            <Button variant="primary">
              <Link to={routes[board.name]}>Go to {board.label}</Link>
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default HomePage;

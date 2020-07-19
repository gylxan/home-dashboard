import React, { useEffect, useState } from 'react';
import { getBoards } from '../../util/apiclient';
import { Board } from '../../interfaces/board';
import { Card, CardDeck, Spinner } from 'react-bootstrap';
import routes, { getPageTitle } from 'util/routes';
import LinkButton from '../../components/LinkButton';

function HomePage() {
  const [isLoading, setLoading] = useState(true);
  const [boards, setBoards] = useState([] as Board[]);
  useEffect(() => {
    document.title = getPageTitle();
    getBoards().then((data) => {
      setBoards(data);
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Spinner animation="border" variant="primary" />;
  }

  return (
    <div className="HomePage">
      <CardDeck>
        {boards.map((board) => (
          <Card style={{ width: '14rem' }} key={board.name}>
            <Card.Body>
              <Card.Title>{board.label}</Card.Title>
              <Card.Text>{board.description}</Card.Text>
              <LinkButton to={routes[board.name]} variant="primary">
                Zu {board.label}
              </LinkButton>
            </Card.Body>
          </Card>
        ))}
      </CardDeck>
    </div>
  );
}

export default HomePage;

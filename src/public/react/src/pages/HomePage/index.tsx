import React, { useEffect, useState } from 'react';
import { getBoards } from '../../util/apiclient';
import { Board } from '../../interfaces/board';
import { Card, Spinner } from 'react-bootstrap';
import routes, { getPageTitle } from 'util/routes';
import skipboImage from '../../assets/icons/skipbo.png';
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
      {boards.map((board) => (
        <Card style={{ width: '14rem' }} key={board.name}>
          <Card.Img variant="top" src={skipboImage} />
          <Card.Body>
            <Card.Title>{board.label}</Card.Title>
            <Card.Text>{board.description}</Card.Text>
            <LinkButton to={routes[board.name]} variant="primary">
              Zu {board.label}
            </LinkButton>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default HomePage;

import React, { useEffect, useState } from 'react';
import { getBoards } from '../../util/apiclient';
import { Board } from '../../interfaces/board';
import { Spinner, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import routes, {getPageTitle} from 'util/routes';
import skipboImage from '../../assets/icons/skipbo.png';

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
            <Link to={routes[board.name]}>
              <Button variant="primary">Zu {board.label}</Button>
            </Link>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default HomePage;

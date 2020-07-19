import React, { useEffect, useState } from 'react';
import { getBoards } from '../../util/apiclient';
import { Board } from '../../interfaces/board';
import { Card, CardDeck, Spinner, Container, Row, Col } from 'react-bootstrap';
import routes, { getPageTitle } from 'util/routes';
import LinkButton from '../../components/LinkButton';
import Tile from './Tile';
import { DEFAULT_COLORS } from '../../util/colors';

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
      <Container fluid>
        <Row>
          {boards.map((board, index) => (
            <Col key={board.name}>
              <Tile
                name={board.name}
                label={board.label}
                description={board.description}
                backgroundColor={DEFAULT_COLORS[index]}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;

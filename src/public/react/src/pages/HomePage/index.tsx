import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { getBoards } from '../../util/apiclient';
import { Board } from '../../interfaces/board';
import { getPageTitle } from 'util/routes';
import Tile from './Tile';
import { DEFAULT_COLORS } from '../../util/colors';

import styles from './HomePage.module.css';

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
        <Row className="justify-content-md-center">
          {boards.map((board, index) => (
            <Col key={board.name} sm className={styles.Column}>
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

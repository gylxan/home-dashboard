import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { getBoards } from '../../util/apiclient';
import { Board } from '../../interfaces/board';
import { getPageTitle } from 'util/routes';
import Tile from './Tile';
import { DEFAULT_COLORS } from '../../util/colors';
import cardGameIcon from '../../assets/icons/card-game.png';
import dicesIcon from '../../assets/icons/dices.png';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import styles from './HomePage.module.css';

const BOARD_IMAGE_PAtHS: { [gameName: string]: string } = {
  skipbo: cardGameIcon,
  entscheidomat: dicesIcon,
};

const BOARD_ICONS: { [gameName: string]: IconProp } = {
  light: ['far', 'lightbulb'],
};

function HomePage() {
  const [isLoading, setLoading] = useState(true);
  const [boards, setBoards] = useState([] as Board[]);

  useEffect(() => {
    document.title = getPageTitle();
    getBoards()
      .then((data) => setBoards(data))
      .finally(() => setLoading(false));
  }, []);

  if (isLoading && boards.length === 0) {
    return <Spinner animation="border" variant="primary" />;
  }

  return (
    <div className="HomePage">
      <Container fluid>
        <Row>
          {boards.map((board, index) => (
            <Col key={board.name} sm className={styles.Column}>
              <Tile
                name={board.name}
                label={board.label}
                description={board.description}
                backgroundColor={DEFAULT_COLORS[index]}
                imagePath={BOARD_IMAGE_PAtHS[board.name] || undefined}
                icon={BOARD_ICONS[board.name] || undefined}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;

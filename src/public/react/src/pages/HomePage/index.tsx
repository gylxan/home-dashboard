import React, { useEffect } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { Board } from '../../interfaces/board';
import { getPageTitle } from 'util/routes';
import Tile from './Tile';
import { DEFAULT_COLORS } from '../../util/colors';
import cardGameIcon from '../../assets/icons/card-game.png';
import dicesIcon from '../../assets/icons/dices.png';
import lightBulbIcon from '../../assets/icons/light-bulb.png';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { RootState } from '../../reducers';
import { connect } from 'react-redux';
import { fetchBoards } from '../../actions/boardActions';

import styles from './HomePage.module.css';
import { getBoards, getBoardsLoading } from '../../selectors/boardSelectors';

const BOARD_IMAGE_PAtHS: { [gameName: string]: string } = {
  skipbo: cardGameIcon,
  entscheidomat: dicesIcon,
  light: lightBulbIcon,
};

const BOARD_ICONS: { [gameName: string]: IconProp } = {
  //light: ['far', 'lightbulb'],
};

export type Props = StateProps & DispatchProps;

export function HomePage({ boards, isLoading, fetchBoards }: Props) {
  useEffect(() => {
    document.title = getPageTitle();
    fetchBoards();
  }, [fetchBoards]);

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

interface StateProps {
  boards: Board[];
  isLoading: boolean;
}

interface DispatchProps {
  fetchBoards: () => void;
}

const mapStateToProps = (state: RootState): StateProps => ({
  boards: getBoards(state),
  isLoading: getBoardsLoading(state),
});

const mapDispatchToProps: DispatchProps = {
  fetchBoards,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

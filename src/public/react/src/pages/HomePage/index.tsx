import React, { useEffect } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { Board } from '../../interfaces/board';
import { getPageTitle } from 'util/routes';
import Tile from './Tile';
import { DEFAULT_COLORS } from '../../util/colors';
import cardGameIcon from '../../assets/icons/card-game.png';
import dicesIcon from '../../assets/icons/dices.png';
import lightBulbIcon from '../../assets/icons/light-bulb.png';

import { RootState } from '../../reducers';
import { connect } from 'react-redux';
import { actionFetchBoards } from '../../actions/boardActions';

import styles from './HomePage.module.css';
import { getBoards, getBoardsLoading } from '../../selectors/boardSelectors';

const BOARD_IMAGE_PATHS: { [gameName: string]: string } = {
  skipbo: cardGameIcon,
  entscheidomat: dicesIcon,
  light: lightBulbIcon,
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
                imagePath={BOARD_IMAGE_PATHS[board.name] || undefined}
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
  fetchBoards: actionFetchBoards,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

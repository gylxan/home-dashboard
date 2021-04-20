import React from 'react';
import { Board } from '../../interfaces/board';
import Tile from './Tile';
import { DEFAULT_COLORS } from '../../util/colors';
import cardGameIcon from '../../assets/icons/card-game.png';
import dicesIcon from '../../assets/icons/dices.png';
import lightBulbIcon from '../../assets/icons/light-bulb.png';

import { RootState } from '../../reducers';
import { connect } from 'react-redux';
import { actionFetchBoards } from '../../actions/boardActions';

import { getBoards, getBoardsLoading } from '../../selectors/boardSelectors';
import Spinner from '../../components/Spinner';
import { useComponentDidMount } from '../../hocs/useComponentDidMount';
import Page from '../../components/Page';
import styles from './HomePage.module.css';

const BOARD_IMAGE_PATHS: { [gameName: string]: string } = {
  skipbo: cardGameIcon,
  entscheidomat: dicesIcon,
  light: lightBulbIcon,
};

export type Props = StateProps & DispatchProps;

export function HomePage({ boards, isLoading, fetchBoards }: Props) {
  useComponentDidMount(() => {
    fetchBoards();
  });

  if (isLoading && boards.length === 0) {
    return <Spinner />;
  }

  return (
    <Page className={styles.HomePage}>
      {boards.map((board, index) => (
        <Tile
          key={board.name}
          name={board.name}
          label={board.label}
          description={board.description}
          backgroundColor={DEFAULT_COLORS[index]}
          imagePath={BOARD_IMAGE_PATHS[board.name] || undefined}
        />
      ))}
    </Page>
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

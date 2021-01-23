import React, { ChangeEvent } from 'react';

import styles from './Entscheidomat.module.css';
import { Form, Button } from 'react-bootstrap';
import {
  getEntscheidomatList,
  hasEntscheidomatMusic,
  setEntscheidomatList,
  setEntscheidomatMusic,
} from '../../util/localStorage';
// @ts-ignore
import angryBeaversSound from '../../assets/audios/angry-beavers.mp3';

export interface Props {}

export interface State {
  options: string[];
  currentOption: string | undefined;
  isStarted: boolean;
  isStopping: boolean;
  isMusicEnabled: boolean;
}

class Entscheidomat extends React.PureComponent<Props, State> {
  state = {
    options: getEntscheidomatList(),
    isMusicEnabled: hasEntscheidomatMusic(),
    currentOption: undefined,
    isStarted: false,
    isStopping: false,
  };
  interval: number | undefined;
  audio = new Audio(angryBeaversSound);

  componentWillUnmount() {
    this.stop();
  }

  handleListChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const newList = e.currentTarget.value.split('\n');
    setEntscheidomatList(newList);
    this.setState({
      options: newList,
    });
  };

  handleButtonClick = (): void => {
    const { isStarted } = this.state;

    if (isStarted) {
      this.stopLazy();
    } else {
      this.start();
    }
  };

  startMusic = () => {
    const { isMusicEnabled } = this.state;
    if (isMusicEnabled) {
      this.audio.currentTime = 0;
      this.audio.play();
    }
  };

  stopMusic = () => {
    const { isMusicEnabled } = this.state;
    if (isMusicEnabled) {
      this.audio.pause();
    }
  };

  start = () => {
    this.startMusic();
    this.setState({
      isStarted: true,
    });
    this.clearInterval();
    this.interval = window.setInterval(() => {
      this.setRandomOption();
    }, 60);
  };

  stopLazy = () => {
    this.setState({
      isStopping: true,
    });
    setTimeout(() => {
      this.setState({
        isStopping: false,
        isStarted: false,
      });
      this.stop();
    }, 2000);
  };

  stop = () => {
    this.clearInterval();
    this.stopMusic();
  };

  clearInterval = () => {
    if (this.interval) {
      window.clearInterval(this.interval);
    }
  };

  setRandomOption = () => {
    const { options } = this.state;
    const optionsWithoutEmptyElements = options.filter((element) => element.trim() !== '');
    const currentOption = optionsWithoutEmptyElements[Math.floor(Math.random() * optionsWithoutEmptyElements.length)];
    this.setState({
      currentOption,
    });
  };

  setIsMusicEnabled = (isMusicEnabled: boolean): void => {
    this.setState(
      {
        isMusicEnabled: isMusicEnabled,
      },
      () => {
        setEntscheidomatMusic(isMusicEnabled);
      },
    );
  };

  render(): JSX.Element {
    const { currentOption, options, isStopping, isStarted, isMusicEnabled } = this.state;
    return (
      <Form className={styles.Entscheidomat}>
        <Form.Control
          className={styles.Textarea}
          as="textarea"
          rows={5}
          name="list"
          value={options.join('\n')}
          onChange={this.handleListChange}
          disabled={isStarted}
        />
        <Form.Check
          checked={isMusicEnabled}
          onChange={(event) => this.setIsMusicEnabled(event.currentTarget.checked)}
          label="Musik abspielen"
          type="checkbox"
          name="music"
          disabled={isStarted}
          id="entscheidomat-music"
        />
        <h4 className={styles.OptionText}>{currentOption === undefined ? 'Starte zum Entscheiden!' : currentOption}</h4>
        <Button
          type="button"
          variant="primary"
          disabled={this.state.options.length < 2 || isStopping}
          onClick={this.handleButtonClick}
          className={styles.Button}
        >
          {isStarted ? (isStopping ? 'Stoppe...' : 'Stoppen') : 'Starten'}
        </Button>
      </Form>
    );
  }
}

export default Entscheidomat;

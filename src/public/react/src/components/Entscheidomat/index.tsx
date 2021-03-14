import React, { ChangeEvent } from 'react';

import {
  getEntscheidomatList,
  hasEntscheidomatMusic,
  setEntscheidomatList,
  setEntscheidomatMusic,
} from '../../util/localStorage';
// @ts-ignore
import angryBeaversSound from '../../assets/audios/angry-beavers.mp3';
import Button from '../Button';
import Checkbox from '../Checkbox';
import Typography from '../Typography';
import TextField from '../TextField';

import styles from './Entscheidomat.module.css';

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
      <form className={styles.Entscheidomat} noValidate>
        <TextField
          multiline
          rows={5}
          name="list"
          value={options.join('\n')}
          onChange={this.handleListChange}
          disabled={isStarted}
          variant="outlined"
          fullWidth
          label="Liste von Optionen"
        />
        <Checkbox
          id="entscheidomat-music"
          color="primary"
          onChange={(event) => this.setIsMusicEnabled(event.currentTarget.checked)}
          checked={isMusicEnabled}
          disabled={isStarted}
          name="music"
          label="Musik abspielen"
        />

        <Typography variant="h5">{currentOption === undefined ? 'Starte zum Entscheiden!' : currentOption}</Typography>

        <Button
          type="button"
          variant="contained"
          color="primary"
          disabled={this.state.options.length < 2 || isStopping}
          onClick={this.handleButtonClick}
        >
          {isStarted ? (isStopping ? 'Stoppe...' : 'Stoppen') : 'Starten'}
        </Button>
      </form>
    );
  }
}

export default Entscheidomat;

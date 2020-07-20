import React, { ChangeEvent } from 'react';

import styles from './Entscheidomat.module.css';
import { Form, Button } from 'react-bootstrap';
import { getEntscheidomatList, setEntscheidomatList } from '../../util/localStorage';
// @ts-ignore
import angryBeaversSound from '../../assets/audios/angry-beavers.mp3';

export interface Props {}

export interface State {
  options: string[];
  currentOption: string | undefined;
  isStarted: boolean;
  isStopping: boolean;
}

class Entscheidomat extends React.PureComponent<Props, State> {
  state = {
    options: getEntscheidomatList(),
    currentOption: undefined,
    isStarted: false,
    isStopping: false,
  };
  interval: number | undefined;
  audio = new Audio(angryBeaversSound);

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
      this.stop();
    } else {
      this.start();
    }
  };

  start = () => {
    this.audio.currentTime = 0;
    this.audio.play();
    this.setState({
      isStarted: true,
    });
    this.clearInterval();
    this.interval = window.setInterval(() => {
      this.setRandomOption();
    }, 60);
  };

  stop = () => {
    this.setState({
      isStopping: true,
    });
    setTimeout(() => {
      this.setState({
        isStopping: false,
        isStarted: false,
      });
      this.clearInterval();
      this.audio.pause();
    }, 2000);
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

  render(): JSX.Element {
    const { currentOption, isStopping, isStarted } = this.state;
    return (
      <Form className={styles.Entscheidomat}>
        <Form.Control
          className={styles.Textarea}
          as="textarea"
          rows={5}
          name="list"
          value={this.state.options.join('\n')}
          onChange={this.handleListChange}
          disabled={isStarted}
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

import React from 'react';
import { Card, Spinner } from 'react-bootstrap';
import styles from './ReloadableCard.module.css';

interface State {
  data: any[] | any;
  isLoading: boolean;
}
export interface Props {
  title: string;
  fetchData: () => Promise<any[] | any>;
  children: React.ReactNode;
}
const INTERVAL = 10000;
class ReloadableCard extends React.PureComponent<Props, State> {
  state = {
    data: [],
    isLoading: false,
  };
  timer: null | number = null;
  componentDidMount() {
    this.loadData();
    this.startTimer();
  }

  loadData = () => {
    const { fetchData } = this.props;
    this.setState({ isLoading: true });
    fetchData().finally(() => {
      this.setState({ isLoading: false });
    });
  };

  startTimer = () => {
    this.stopTimer();
    this.timer = window.setInterval(() => {
      this.loadData();
    }, INTERVAL);
  };

  stopTimer = () => {
    if (this.timer) {
      window.clearInterval(this.timer);
    }
  };

  componentWillUnmount() {
    this.stopTimer();
  }

  render() {
    const { title, children } = this.props;
    const { isLoading } = this.state;
    return (
      <Card className="ReloadableStatisticCard">
        <Card.Body>
          <Card.Title>
            <div className={styles.Header}>
              <div>{title}</div>
              {isLoading && (
                <Spinner variant="secondary" as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              )}
            </div>
          </Card.Title>
          <Card.Body>{children}</Card.Body>
        </Card.Body>
      </Card>
    );
  }
}
export default ReloadableCard;

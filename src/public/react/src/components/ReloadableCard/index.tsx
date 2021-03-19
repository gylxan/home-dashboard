import React from 'react';
import Spinner, {Size} from '../Spinner';
import Card from '../Card';
import Typography from '../Typography';
import styles from './ReloadableCard.module.css';

interface State {
  data: any[] | any;
  isLoading: boolean;
}
export interface Props {
  title: string;
  fetchData: () => Promise<any>;
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
      <Card className="ReloadableStatisticCard" variant="outlined">
        <Card.Content>
          <div className={styles.Header}>
            <Typography variant="subtitle1">{title}</Typography>
            {isLoading && <Spinner size={Size.Small} />}
          </div>
          {children}
        </Card.Content>
      </Card>
    );
  }
}
export default ReloadableCard;

import React from 'react';
import { Card, Spinner, Table } from 'react-bootstrap';
import styles from './ReloadableStatisticCard.module.css';

interface State {
  data: any[] | any;
  isLoading: boolean;
}
export interface Props {
  title: string;
  fetchData: () => Promise<any[] | any>;
}
const INTERVAL = 10000;
class ReloadableStatisticCard extends React.PureComponent<Props, State> {
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
    fetchData()
      .then((data) => this.setState({ data }))
      .finally(() => this.setState({ isLoading: false }));
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

  renderData = () => {
    const { data } = this.state;
    if (!data) {
      return;
    }
    if (Array.isArray(data)) {
      return <></>;
    } else {
      return (
        <Table responsive striped>
          <tbody>
            {Object.keys(data).map((key) => (
              <tr>
                <td>{key}</td>
                <td>{data[key]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    }
  };
  render() {
    const { title } = this.props;
    const { isLoading } = this.state;
    return (
      <Card className="ReloadableStatisticCard">
        <Card.Body>
          <Card.Title>
            <div className={styles.Header}>
              <div>{title}</div>
              {isLoading && <Spinner variant="secondary" as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
            </div>
          </Card.Title>
          <Card.Text>{this.renderData()}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}
export default ReloadableStatisticCard;

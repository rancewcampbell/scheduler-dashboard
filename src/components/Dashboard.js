import React, { Component } from 'react';
import axios from 'axios';
import Loading from './Loading';
import Panel from './Panel';
import classnames from 'classnames';

const data = [
  {
    id: 1,
    label: 'Total Interviews',
    value: 6,
  },
  {
    id: 2,
    label: 'Least Popular Time Slot',
    value: '1pm',
  },
  {
    id: 3,
    label: 'Most Popular Day',
    value: 'Wednesday',
  },
  {
    id: 4,
    label: 'Interviews Per Day',
    value: '2.3',
  },
];

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      focused: null,
      days: [],
      appointments: {},
      interviewers: {},
    };

    this.selectPanel = this.selectPanel.bind(this);
  }

  selectPanel(id) {
    this.setState(previousState => ({
      focused: previousState.focused !== null ? null : id,
    }));
  }

  componentDidMount() {
    const focused = JSON.parse(localStorage.getItem('focused'));

    if (focused) {
      this.setState({ focused });
    }

    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then(([days, appointments, interviewers]) => {
      this.setState({
        loading: false,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      });
    });
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.focused !== this.state.focused) {
      localStorage.setItem('focused', JSON.stringify(this.state.focused));
    }
  }

  render() {
    const dashboardClasses = classnames('dashboard', {
      'dashboard--focused': this.state.focused,
    });

    const panels = data
      .filter(el => this.state.focused === null || this.state.focused === el.id)
      .map(el => (
        <Panel
          onSelect={this.selectPanel}
          value={el.value}
          labe={el.label}
          key={el.id}
          id={el.id}
        />
      ));

    if (this.state.loading) {
      return <Loading />;
    }

    return <main className={dashboardClasses}>{panels}</main>;
  }
}

export default Dashboard;

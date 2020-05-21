import React, { Component } from 'react';
import Loading from './Loading';
import classnames from 'classnames';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }
  render() {
    const dashboardClasses = classnames('dashboard');
    if (this.state.loading) {
      return <Loading />;
    }
    return <main className={dashboardClasses}></main>;
  }
}

export default Dashboard;

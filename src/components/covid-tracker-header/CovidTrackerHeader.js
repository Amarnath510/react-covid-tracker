import React, { Component } from 'react'
import CovidTrackerUtil from '../../util/CovidTrackerUtil';
import './CovidTrackerHeader.css';

export class CovidTrackerHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lastUpdatedDate: null,
      isLoading: true
    }
  }

  componentDidMount() {
    this.setState({
      lastUpdatedDate: CovidTrackerUtil.getLastUpdatedDate(this.props.covidData.cases_time_series),
      isLoading: false
    });
  }

  render() {
    return (
        !this.state.isLoading && 
          <header className="covid-tracker-header">
            <h2 className="covid-tracker-header__title text-light">State-wise Covid Cases</h2>
            <p className="covid-tracker-header__desc">Last Updated Date: &nbsp;
              <strong className="covid-tracker-header__last-updated-date">{this.state.lastUpdatedDate}</strong>
            </p>
          </header>
    )
  }
}

export default CovidTrackerHeader

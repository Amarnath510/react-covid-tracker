import React, { Component } from 'react'
import './CovidTrackerHeader.css';

export class CovidTrackerHeader extends Component {

  render() {
    return (
      <header className="covid-tracker-header">
        <h2 className="covid-tracker-header__title">{ this.props.title }</h2>
          <p className="covid-tracker-header__desc">&nbsp;Last Updated Date: &nbsp;
            <strong className="covid-tracker-header__last-updated-date">{ this.props.lastUpdatedDate }</strong>
          </p>
      </header>
    )
  }
}

export default CovidTrackerHeader

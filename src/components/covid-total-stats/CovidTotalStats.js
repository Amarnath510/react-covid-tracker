import React, { Component } from 'react'
import './CovidTotalStats.css'
import CovidTrackerUtil from '../../util/CovidTrackerUtil';

export class CovidTotalStats extends Component {
  render() {
    
    const percentageTotalCases = (totalCases, latestActiveCases) => {
      const total = parseInt(totalCases, 10);
      const dailyActive = parseInt(latestActiveCases, 10);
      const totalPer = ((dailyActive / total) * 100).toFixed(2);
      const message = ` over yesterday `
      return <div className="covid-total-stats__daily-cases">
        <span className="covid-total-stats__daily-total">
          {`${totalPer}%`} &#8593;
        </span>
        <span className="text-light">{ message }</span>
      </div>
    };

    const dailyCases = (type, casesCount, message) => {
      const label = ` ${message} yesterday`;
      return <div className="covid-total-stats__daily-cases">
        <span className={`covid-total-stats__daily-${type}`}>
          { CovidTrackerUtil.toLocal(casesCount) }
        </span>
        <span className="text-light">{ label }</span>
      </div>
    };

    return (
      <article className="covid-total-stats">
        <ul className="covid-total-stats__cards">
          <li className="covid-total-stats__card">
            <div className="covid-total-stats__card-container">
              <div className="covid-total-stats__card-stats">
                <h4 className="text-light">Total Cases</h4>
                <h3>{ CovidTrackerUtil.toLocal(this.props.totalStats.confirmed) }</h3>
              </div>
              <div className="covid-total-stats__card-logo-container">
                <img src="images/confirmed.png" alt="confirmed" className="covid-total-stats__card-logo"/>
              </div>
            </div>
            { percentageTotalCases(this.props.totalStats.confirmed, this.props.latestCasesTimeSeries.dailyconfirmed) }
          </li>
          <li className="covid-total-stats__card">
            <div className="covid-total-stats__card-container">
              <div className="covid-total-stats__card-stats">
                <h4 className="text-light">Active</h4>
                <h3>{ CovidTrackerUtil.toLocal(this.props.totalStats.active) }</h3>
              </div>
              <div className="covid-total-stats__card-logo-container">
                <img src="images/active.png" alt="confirmed" className="covid-total-stats__card-logo" />
              </div>
            </div>
            { dailyCases('confirmed', this.props.latestCasesTimeSeries.dailyconfirmed, 'cases') }
          </li>
        </ul>
        <ul className="covid-total-stats__cards">
          <li className="covid-total-stats__card">
            <div className="covid-total-stats__card-container">
              <div className="covid-total-stats__card-stats">
                <h4 className="text-light">Recovered</h4>
                <h3>{ CovidTrackerUtil.toLocal(this.props.totalStats.recovered) }</h3>
              </div>
              <div className="covid-total-stats__card-logo-container">
                <img src="images/recovered.png" alt="confirmed" className="covid-total-stats__card-logo" />
              </div>
            </div>
            { dailyCases('recovered', this.props.latestCasesTimeSeries.dailyrecovered, 'recovered') }
          </li>
          <li className="covid-total-stats__card">
            <div className="covid-total-stats__card-container">
              <div className="covid-total-stats__card-stats">
                <h4 className="text-light">Deaths</h4>
                <h3>{ CovidTrackerUtil.toLocal(this.props.totalStats.deaths) }</h3>
              </div>
              <div className="covid-total-stats__card-logo-container">
                <img src="images/death.png" alt="confirmed" className="covid-total-stats__card-logo" />
              </div>
            </div>
            { dailyCases('deaths', this.props.latestCasesTimeSeries.dailydeceased, 'deaths') }
          </li>
        </ul>
      </article>
    )
  }
}

export default CovidTotalStats

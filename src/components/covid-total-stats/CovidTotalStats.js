import React, { Component } from 'react'
import './CovidTotalStats.css'

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
          { parseInt(casesCount, 10).toLocaleString() }
        </span>
        <span className="text-light">{ label }</span>
      </div>
    };

    return (
      <div className="covid-total-stats">
        <ul className="covid-total-stats__cards">
          <li className="covid-total-stats__card">
            <div className="covid-total-stats__card-container">
              <div className="covid-total-stats__card-stats">
                <p className="text-light">Total Cases</p>
                <h3>{ parseInt(this.props.totalStats.confirmed, 10).toLocaleString() }</h3>
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
                <p className="text-light">Active</p>
                <h3>{parseInt(this.props.totalStats.active, 10).toLocaleString()}</h3>
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
                <p className="text-light">Recovered</p>
                <h3>{parseInt(this.props.totalStats.recovered, 10).toLocaleString()}</h3>
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
                <p className="text-light">Deaths</p>
                <h3>{parseInt(this.props.totalStats.deaths, 10).toLocaleString()}</h3>
              </div>
              <div className="covid-total-stats__card-logo-container">
                <img src="images/death.png" alt="confirmed" className="covid-total-stats__card-logo" />
              </div>
            </div>
            { dailyCases('deaths', this.props.latestCasesTimeSeries.dailydeceased, 'deaths') }
          </li>
        </ul>
      </div>
    )
  }
}

export default CovidTotalStats

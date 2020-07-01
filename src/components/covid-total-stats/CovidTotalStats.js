import React, { Component } from 'react'
import './CovidTotalStats.css'

// Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
export class CovidTotalStats extends Component {
  render() {
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
          </li>
          <li className="covid-total-stats__card">
            <div className="covid-total-stats__card-container">
              <div className="covid-total-stats__card-stats">
                <p className="text-light">Active Cases</p>
                <h3>{parseInt(this.props.totalStats.active, 10).toLocaleString()}</h3>
              </div>
              <div className="covid-total-stats__card-logo-container">
                <img src="images/active.png" alt="confirmed" className="covid-total-stats__card-logo" />
              </div>
            </div>
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
          </li>
        </ul>
      </div>
    )
  }
}

export default CovidTotalStats

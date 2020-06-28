import React, { Component } from 'react'
import './CovidColorCodes.css';

export class CovidColorCodes extends Component {
  render() {
    return (
      <div className="covid-color-codes">
        <ul className="covid-color-codes__list">
          <li className="covid-color-codes__list-item">
            <div className="covid-color-codes__code active-bg"></div><span className="active-text"> &nbsp; Active</span>
          </li>
          <li className="covid-color-codes__list-item">
            <div className="covid-color-codes__code confirmed-bg"></div><span className="confirmed-text"> &nbsp; Confirmed</span>
          </li>
          <li className="covid-color-codes__list-item">
            <div className="covid-color-codes__code recovered-bg"></div><span className="recovered-text"> &nbsp; Recovered</span>
          </li>
          <li className="covid-color-codes__list-item">
            <div className="covid-color-codes__code deaths-bg"></div><span className="deaths-text"> &nbsp; Deaths</span>
          </li>
        </ul>
      </div>
    )
  }
}

export default CovidColorCodes

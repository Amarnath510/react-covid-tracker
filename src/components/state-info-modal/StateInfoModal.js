import React, { Component } from 'react'
import './StateInfoModal.css'
import CovidTrackerUtil from '../../util/CovidTrackerUtil';
import CovidColorCodes from '../covid-color-coding/CovidColorCodes';

export class StateInfoModal extends Component {

  render() {
    const { stateInfo, stateWithDistrictsInfo } = this.props;
    return (
      <div className="state-info-modal">
        <div className="state-info-modal__close-container">
          <button type="button" className="state-info-modal__close-btn text-light" onClick={ this.props.onRequestClose }>X</button>
        </div>
        <div className="state-info-modal__header">
          <h2 className="state-info-modal__title text-light">{ stateInfo.state }</h2>
          <p className="state-info-modal__desc text-light">Last updated: <strong className="text-covid">{ stateInfo.lastupdatedtime }</strong></p>
        </div>
        <div className="state-info-modal__content">
          <CovidColorCodes />
          <ul className="state-info-modal__districts">
          {
          CovidTrackerUtil.getTopDistrictsWithActiveCases(stateWithDistrictsInfo)
            .map(district => {
              return <li key={district.name} className="state-info-modal__district">
                <ul className="state-info-modal__districts-cases">
                  <li className="state-info-modal__district-name-container">
                    <h3 className="state-info-modal__district-name text-light">{district.name}</h3>
                  </li>
                  <li className="state-info-modal__district-active-cases">
                    <div className="state-info-modal__active-cases-container text-light">
                      <p className="state-info-modal__case-stats active-text">{ district.active }</p>
                      <p className="state-info-modal__case-stats confirmed-text">{ district.confirmed }</p>
                      <p className="state-info-modal__case-stats recovered-text">{ district.recovered }</p>
                      <p className="state-info-modal__case-stats deaths-text">{ district.deceased }</p>
                    </div>
                  </li>  
                </ul>
              </li>
            })
          }
          </ul>
          <div className="state-info-modal__disclaimer">
            <p className="state-info-modal__desc text-light">Disclaimer: &nbsp;
              <strong>Displaying only top 5 districts(if available) with highest active cases.</strong>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default StateInfoModal

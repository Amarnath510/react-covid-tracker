import React, { Component } from 'react'
import './StateStats.css'

export class StateStats extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stateInfo: {},
      isLoading: true
    }
  }

  componentDidMount() {
    this.setState({
      stateInfo: this.props.stateInfo,
      isLoading: false
    })
  }

  render() {
    const { stateInfo, isLoading } = this.state;
    return (
      !isLoading &&
        <div className="state-stats">
      <ul className="state-stats__list">
            <li key={'active_' + stateInfo.statecode} className="text-light">
              <span className="active-text">{stateInfo.active}</span>
            </li>
            <li key={'confirmed_' + stateInfo.statecode} className="text-light">
              <span className="confirmed-text">{stateInfo.confirmed}</span>
            </li>
            <li key={'recovered_' + stateInfo.statecode} className="text-light">
              <span className="recovered-text">{stateInfo.recovered}</span>
            </li>
            <li key={'deaths_' + stateInfo.statecode} className="text-light">
              <span className="deaths-text">{stateInfo.deaths}</span>
            </li>
          </ul>
        </div>
    )
  }
}

export default StateStats

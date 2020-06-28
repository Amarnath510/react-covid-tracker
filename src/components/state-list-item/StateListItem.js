import React, { Component } from 'react'
import StateStats from '../state-stats/StateStats';
import './StateListItem.css';

export class StateListItem extends Component {

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

  handleStateSelect(stateInfo) {
    this.props.onStateSelect(stateInfo);
  }

  render() {
    const { stateInfo, isLoading } = this.state;
    return (
      !isLoading && 
        <button className="state-list-item" onClick={ this.handleStateSelect.bind(this, stateInfo) }>
          <h3 className="state-list-item__title text-light">{ stateInfo.state }</h3>
          <div className="state-list-item__state-stats">
            <StateStats stateInfo={ stateInfo }/>
          </div>
        </button>
    )
  }
}

export default StateListItem

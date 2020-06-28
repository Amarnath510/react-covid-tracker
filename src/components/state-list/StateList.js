import React, { Component } from 'react'
import './StateList.css';
import StateListItem from '../state-list-item/StateListItem';
import Modal from 'react-modal'
import StateInfoModal from '../state-info-modal/StateInfoModal';
import CovidColorCodes from '../covid-color-coding/CovidColorCodes';

export class StateList extends Component {

  constructor() {
    super();
    this.state = {
      modal: {
        isModalOpen: false,
        stateInfo: null,
        stateWithDistrictsInfo: null
      }
    }
    this.escFunction = this.escFunction.bind(this);
  }

  componentDidMount() {
    // On escape key close the Modal
    document.addEventListener("keydown", this.escFunction, false);
  }

  escFunction(event) {
    if (event.keyCode === 27) {
      this.setModalStatus(false, {});
    }
  }

  setModalStatus(status, stateInfo = {}, stateWithDistrictsInfo = {}) {
    this.setState({
      modal: {
        isModalOpen: status,
        stateInfo,
        stateWithDistrictsInfo
      }
    });
  }

  handleStateSelect(stateInfo) {
    if(this.state.modal.isModalOpen) {
      this.setModalStatus(false);
    }
    const stateWithDistrictsInfo = this.props.statesWithDistricts[stateInfo.state];
    this.setModalStatus(true, stateInfo, stateWithDistrictsInfo);
  }

  render() {
    const modalStyle = { overlay: { background: '#595959' } };
    return (
      <div className="state-list">
        <CovidColorCodes/>
        <ul className="state-list__states-list">
          {
            this.props.statewise.map(stateInfo => {
              return <li key={stateInfo.statecode}>
                <StateListItem  stateInfo={stateInfo} onStateSelect={this.handleStateSelect.bind(this)}/>
                <Modal style={ modalStyle }
                  isOpen={this.state.modal.isModalOpen}
                  ariaHideApp={false}>
                  <StateInfoModal 
                    stateInfo={this.state.modal.stateInfo}
                    stateWithDistrictsInfo={this.state.modal.stateWithDistrictsInfo}
                    onRequestClose={ () => this.setModalStatus(false) }/>
                </Modal>
              </li>
            })
          }
        </ul>
      </div>
    )
  }
}

export default StateList

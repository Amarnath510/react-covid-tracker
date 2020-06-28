import React, { Component } from 'react'
import './Loading.css';

export class Loading extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  render() {
    return (
      this.state.isLoading && 
      <div className="loading">
        <div className="loading__spinner"></div>
      </div>
    )
  }
}

export default Loading

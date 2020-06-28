import React, { Component } from 'react'
import './CovidTrackerSort.css'

export class CovidTrackerSort extends Component {

  sortAttributes = [
    {
      label: 'State',
      type: 'state'
    },
    {
      label: 'Active Cases Highest',
      type: 'active-desc'
    },
    {
      label: 'Active Cases Lowest',
      type: 'active-inc'
    },
    {
      label: 'Confirmed Cases Highest',
      type: 'confirmed-desc'
    },
    {
      label: 'Confirmed Cases Lowest',
      type: 'confirmed-inc'
    },
    {
      label: 'Deaths Highest',
      type: 'deaths-desc'
    },
    {
      label: 'Deaths Lowest',
      type: 'deaths-inc'
    }
  ];

  constructor(props) {
    super(props);
    this.state = {
      sortAttributes: [],
      isLoading: true
    }
  }

  componentDidMount() {
    this.setState({
      sortAttributes: this.sortAttributes,
      isLoading: false
    })
  }

  onSortChange = (e) => {
    e.preventDefault();
    this.props.onSortChanged(e.target.value);
  }

  render() {
    return (
      !this.state.isLoading &&
      <div className="covid-tracker-sort">
        <span style={{fontWeight: 'bold'}}>Sort by - &nbsp;</span>
        <select className="covid-tracker-sort__select" onChange={ this.onSortChange }>
          {
            this.state.sortAttributes.map(attribute => {
              return <option key={ attribute.type } value={ attribute.type }>{ attribute.label }</option>
            })
          }
        </select>
      </div>
    )
  }
}

export default CovidTrackerSort

import React, { Component } from 'react'
import './StateTableData.css'
import CovidTrackerUtil from '../../util/CovidTrackerUtil';

export class StateTableData extends Component {

  isSortActive(sortBy) {
    return this.props.sortBy === sortBy;
  }

  sortChange(sortBy) {
    const existingSort = this.props.sortBy.split('-');
    let newSortBy = '';
    if (existingSort[0] === sortBy) {
      newSortBy = `${sortBy}-${ existingSort[1] === 'inc' ? 'dec' : 'inc'}`
    } else {
      newSortBy = `${sortBy}-inc`;
    }
    this.props.onSortChanged(newSortBy);
  }

  render() {
    return (
      <div className="state-table-data">
        <div className="state-table-data__container">
          <table className="state-table-data__table">
            <thead>
              <tr className="state-table-data__table-row">
                <th className="state-table-data__table-data-header" onClick={ this.sortChange.bind(this, 'state') }>
                  <div className="state-table-data__sort-container">
                    <span className={`state-table-data__sort-icon ${this.isSortActive('state-inc') ? 'state-table-data__sort_active' : 'state-table-data__sort_inactive'}`}>&#8593;</span>
                    <span className={`state-table-data__sort-icon ${this.isSortActive('state-dec') ? 'state-table-data__sort_active' : 'state-table-data__sort_inactive'}`}>&#8595;</span>
                  </div>
                  <span>State</span>
                </th>
                <th className="state-table-data__table-data-header" onClick={this.sortChange.bind(this, 'confirmed')}>
                  <div className="state-table-data__sort-container">
                    <span className={`state-table-data__sort-icon ${this.isSortActive('confirmed-inc') ? 'state-table-data__sort_active' : 'state-table-data__sort_inactive'}`}>&#8593;</span>
                    <span className={`state-table-data__sort-icon ${this.isSortActive('confirmed-dec') ? 'state-table-data__sort_active' : 'state-table-data__sort_inactive'}`}>&#8595;</span>
                  </div>
                  <span>Total</span>
                </th>
                <th className="state-table-data__table-data-header" onClick={this.sortChange.bind(this, 'active')}>
                  <div className="state-table-data__sort-container">
                    <span className={`state-table-data__sort-icon ${this.isSortActive('active-inc') ? 'state-table-data__sort_active' : 'state-table-data__sort_inactive'}`}>&#8593;</span>
                    <span className={`state-table-data__sort-icon ${this.isSortActive('active-dec') ? 'state-table-data__sort_active' : 'state-table-data__sort_inactive'}`}>&#8595;</span>
                  </div>
                  <span>Active</span>
                </th>
                <th className="state-table-data__table-data-header" onClick={this.sortChange.bind(this, 'recovered')}>
                  <div className="state-table-data__sort-container">
                    <span className={`state-table-data__sort-icon ${this.isSortActive('recovered-inc') ? 'state-table-data__sort_active' : 'state-table-data__sort_inactive'}`}>&#8593;</span>
                    <span className={`state-table-data__sort-icon ${this.isSortActive('recovered-dec') ? 'state-table-data__sort_active' : 'state-table-data__sort_inactive'}`}>&#8595;</span>
                  </div>
                  <span>Recovered</span>
                </th>
                <th className="state-table-data__table-data-header" onClick={this.sortChange.bind(this, 'deaths')}>
                  <div className="state-table-data__sort-container">
                    <span className={`state-table-data__sort-icon ${this.isSortActive('deaths-inc') ? 'state-table-data__sort_active' : 'state-table-data__sort_inactive'}`}>&#8593;</span>
                    <span className={`state-table-data__sort-icon ${this.isSortActive('deaths-dec') ? 'state-table-data__sort_active' : 'state-table-data__sort_inactive'}`}>&#8595;</span>
                  </div>
                  <span>Deaths</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.statewise.map(stateInfo => {
                  return <tr className="state-table-data__table-row" key={stateInfo.statecode}>
                    <th className="state-table-data__table-data">{ stateInfo.state }</th>
                    <th className="state-table-data__table-data">{ CovidTrackerUtil.toLocal(stateInfo.confirmed) }</th>
                    <th className="state-table-data__table-data">{ CovidTrackerUtil.toLocal(stateInfo.active) }</th>
                    <th className="state-table-data__table-data">{ CovidTrackerUtil.toLocal(stateInfo.recovered) }</th>
                    <th className="state-table-data__table-data">{ CovidTrackerUtil.toLocal(stateInfo.deaths) }</th>
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default StateTableData

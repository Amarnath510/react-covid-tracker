import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
import './CovidStateTimeline.css'
import CovidTrackerUtil from '../../util/CovidTrackerUtil';
import Select from 'react-select'; // https://www.digitalocean.com/community/tutorials/react-react-select

export class CovidStateTimeline extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedStateOption: null,
      stateOptions: [],
      statesMap: {},
      lineChartData: {}
    }
  }

  getStateCaseTimeline(stateCaseTimeline) {
    const data = [];
    Object.keys(stateCaseTimeline)
      .forEach(timeline => data.push(stateCaseTimeline[timeline]));
    return data;
  }

  prepareChartData(stateName, stateMap) {
    const stateTimeline = stateMap.find(state => state.name === stateName).timeline;
    return {
      labels: Object.keys(stateTimeline),
        datasets: [
          {
            label: 'Total Cases',
            fill: false,
            // borderColor: '#086972',
            borderColor: '#2cb978',
            data: this.getStateCaseTimeline(stateTimeline),
          }
        ]
    };
  }

  selectChartData(stateOption) {
    // e.preventDefault();
    this.setState({
      selectedStateOption: stateOption,
      lineChartData: this.prepareChartData(stateOption.value, this.state.statesMap)
    });
  }

  componentDidMount() {
    const stateMapArray = [];
    this.props.stateTimeline.forEach(stateDetail => {
      const stateDetailKeys = Object.keys(stateDetail);
      const stateNameKey = stateDetailKeys[stateDetailKeys.length - 1];
      const stateName = stateDetail[stateNameKey];
      delete stateDetail[stateNameKey];
      stateMapArray.push({
        name: stateName,
        timeline: Object.assign({}, stateDetail)
      });
    });
    const stateMapArraySorted = CovidTrackerUtil.sortStateTimeline(stateMapArray);
    const stateOptions = stateMapArraySorted.map(sortedState => {
      return { label: sortedState.name, value: sortedState.name };
    });
    this.setState({
      selectedStateOption: stateOptions[0],
      stateOptions: stateOptions,
      statesMap: stateMapArraySorted,
      lineChartData: this.prepareChartData(stateMapArraySorted[0].name, stateMapArraySorted)
    })
  }

  render() {
    return (
      <article className="covid-state-timeline">
        <header className="covid-state-timeline__header">
          <h2 className="covid-state-timeline__title">Covid State Timeline</h2>
          <div className="covid-state-timeline__select">
            <Select
              value={ this.state.selectedStateOption }
              options={ this.state.stateOptions }
              onChange={opt => this.selectChartData(opt)}
            />
          </div>
        </header>
        <section style={{ padding: '8px 0' }}>
          <Line
            data={this.state.lineChartData}
            width={300}
            height={400}
            options={{ maintainAspectRatio: false }}/>
        </section>
      </article>
    )
  }
}

export default CovidStateTimeline

import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
import './CovidStateTimeline.css'
import CovidTrackerUtil from '../../util/CovidTrackerUtil';

export class CovidStateTimeline extends Component {

  constructor(props) {
    super(props);
    this.state = {
      statesName: [],
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

  selectChartData(e) {
    e.preventDefault();
    this.setState({
      lineChartData: this.prepareChartData(e.target.value, this.state.statesMap)
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
    this.setState({
      statesName: stateMapArraySorted.map(sortedState => sortedState.name),
      statesMap: stateMapArraySorted,
      lineChartData: this.prepareChartData(stateMapArraySorted[0].name, stateMapArraySorted)
    })
  }

  render() {
    return (
      <article className="covid-state-timeline">
        <header className="covid-state-timeline__header">
          <h2 className="covid-state-timeline__title">Covid State Timeline</h2>
          <select className="covid-state-timeline__select" onChange={this.selectChartData.bind(this)}>
            {
              this.state.statesName.map(stateName => {
                return <option key={stateName} value={stateName}>{stateName}</option>
              })
            }
          </select>
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

import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'

export class CovidCharts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      casesTimeSeries: this.props.casesTimeSeries,
      chartData: {}
    }
  }

  getChartLabels(casesTimeSeries = []) {
    const labels = [];
    casesTimeSeries.forEach(cases => labels.push(cases.date));
    return labels;
  }

  getChartData(casesTimeSeries = []) {
    const casesCount = [];
    casesTimeSeries.forEach(cases => casesCount.push(cases.totalconfirmed));
    return casesCount;
  }

  componentDidMount() {
    this.setState({
      chartData: {
        labels: this.getChartLabels(this.state.casesTimeSeries),
        datasets: [
          {
            label: 'Total Cases',
            data: this.getChartData(this.state.casesTimeSeries),
            backgroundColor: '#ff595d'
          }
        ]
      }
    });
  }

  render() {
    return (
      <div style={{ padding: '32px 0' }}>
        <Line
          data={this.state.chartData}
          width={300}
          height={400}
          options={{ maintainAspectRatio: false }}
        />
      </div>
    )
  }
}

export default CovidCharts

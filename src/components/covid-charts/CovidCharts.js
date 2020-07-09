import React, { Component } from 'react'
import { Line, Bar } from 'react-chartjs-2'


// ChartJS demos: http://jerairrest.github.io/react-chartjs-2/
export class CovidCharts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      casesTimeSeries: this.props.casesTimeSeries,
      barChartData: {},
      lineChartData: {}
    }
  }

  getChartLabels(casesTimeSeries = []) {
    const labels = [];
    casesTimeSeries.forEach(cases => labels.push(cases.date));
    return labels;
  }

  getChartData(casesTimeSeries = [], field) {
    const casesCount = [];
    casesTimeSeries.forEach(cases => casesCount.push(cases[field]));
    return casesCount;
  }

  componentDidMount() {
    this.setState({
      barChartData: {
        labels: this.getChartLabels(this.state.casesTimeSeries),
        datasets: [
          {
            label: 'Total Cases',
            fill: true,
            data: this.getChartData(this.state.casesTimeSeries, 'totalconfirmed'),
            backgroundColor: '#ff595d'
          }
        ]
      },
      lineChartData: {
        labels: this.getChartLabels(this.state.casesTimeSeries),
        datasets: [
          {
            label: 'Total Deaths',
            data: this.getChartData(this.state.casesTimeSeries, 'totaldeceased'),
            backgroundColor: '#626b7a'
          }
        ]
      }
    });
  }

  render() {
    return (
      <article style={{ padding: '32px 0' }}>
        <section style={{padding: '8px 0'}}>
          <Line
            data={this.state.barChartData}
            width={300}
            height={400}
            options={{ maintainAspectRatio: false }}
          />
        </section>

        <section style={{ padding: '8px 0' }}>
          <Bar
            data={this.state.lineChartData}
            width={300}
            height={400}
            options={{ maintainAspectRatio: false }}
          />
        </section>
      </article>
    )
  }
}

export default CovidCharts

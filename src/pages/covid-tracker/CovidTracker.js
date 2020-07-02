import React, { Component } from 'react'
import CovidTrackerHeader from '../../components/covid-tracker-header/CovidTrackerHeader';
import CovidTrackerApi from '../../http/CovidTrackerApi';
import Loading from '../../components/loading/Loading';
import './CovidTracker.css';
import CovidTrackerUtil from '../../util/CovidTrackerUtil';
import CovidTotalStats from '../../components/covid-total-stats/CovidTotalStats';
import StateTableData from '../../components/state-table-data/StateTableData';
import CovidCharts from '../../components/covid-charts/CovidCharts';

export class CovidTracker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      covidData: {},
      statewise: [],
      casesTimeSeries: [],
      statesWithDistricts: {},
      isLoading: true,
      showModal: false,
      sortBy: 'state-inc'
    }
    this.covidApi = CovidTrackerApi.getInstance();
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    this.covidApi.fetchCovidCountryAndStateData()
      .then(responseArr => {
        const covidData = responseArr[0].data;
        const statesWithDistricts = responseArr[1].data;
        this.setState({
          covidData,
          statewise: CovidTrackerUtil.sortDataBy(covidData.statewise),
          casesTimeSeries: covidData.cases_time_series,
          statesWithDistricts: statesWithDistricts,
          isLoading: false
        })
      }, (error) => {
        console.error('Error while calling Api', error);
      });
  }

  onSortChange = (sortBy)  => {
    this.setState({
      statewise: CovidTrackerUtil.sortDataBy(this.state.covidData.statewise, sortBy),
      sortBy: sortBy
    });
  }

  covidTrackerInfo = () => {
    const { covidData, statewise } = this.state;
    const latestCasesTimeSeries = covidData.cases_time_series[covidData.cases_time_series.length - 1];
    return <React.Fragment>
      <CovidTotalStats totalStats={covidData.statewise[0]} latestCasesTimeSeries={ latestCasesTimeSeries }/>
      <CovidTrackerHeader covidData={ covidData } />
      <StateTableData statewise={statewise} onSortChanged={this.onSortChange} sortBy={ this.state.sortBy }/>
      <CovidCharts casesTimeSeries={ covidData.cases_time_series }/>
    </React.Fragment>
  }

  render() {
    if (this.state.isLoading) {
      return <Loading />
    }
    return (
      <div className="covid-tracker">
        { this.covidTrackerInfo() }
      </div>
    )
  }
}

export default CovidTracker

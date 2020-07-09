import React, { Component } from 'react'
import CovidTrackerHeader from '../../components/covid-tracker-header/CovidTrackerHeader';
import CovidTrackerApi from '../../http/CovidTrackerApi';
import Loading from '../../components/loading/Loading';
import './CovidTracker.css';
import CovidTrackerUtil from '../../util/CovidTrackerUtil';
import CovidTotalStats from '../../components/covid-total-stats/CovidTotalStats';
import StateTableData from '../../components/state-table-data/StateTableData';
import CovidCharts from '../../components/covid-charts/CovidCharts';
import CovidStateTimeline from '../../components/covid-state-timeline/CovidStateTimeline';

export class CovidTracker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      covidData: {},
      statewise: [],
      casesTimeSeries: [],
      statesWithDistricts: {},
      stateTimeline: [],
      isLoading: true,
      showModal: false,
      sortBy: 'confirmed-dec'
    }
    this.covidApi = CovidTrackerApi.getInstance();
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    this.covidApi.fetchCovidCountryAndStateData()
      .then(responseArr => {
        const covidData = responseArr[0].data;
        const statesWithDistricts = responseArr[1].data;
        const stateTimeline = responseArr[2].data;
        this.setState({
          covidData,
          statewise: CovidTrackerUtil.sortDataBy(covidData.statewise),
          casesTimeSeries: covidData.cases_time_series,
          statesWithDistricts: statesWithDistricts,
          stateTimeline: stateTimeline,
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
    const { covidData, statewise, stateTimeline, statesWithDistricts } = this.state;
    const latestCasesTimeSeries = covidData.cases_time_series[covidData.cases_time_series.length - 1];
    return <React.Fragment>
      <CovidTotalStats totalStats={covidData.statewise[0]} latestCasesTimeSeries={ latestCasesTimeSeries }/>
      <article className="covid-tracker__state-data">
        <CovidTrackerHeader covidData={ covidData } />
        <StateTableData statewise={statewise} onSortChanged={this.onSortChange} sortBy={ this.state.sortBy }/>
      </article>
      <CovidCharts casesTimeSeries={ covidData.cases_time_series }/>
      <CovidStateTimeline stateTimeline={stateTimeline} statesWithDistricts={statesWithDistricts}/>
    </React.Fragment>
  }

  render() {
    if (this.state.isLoading) {
      return <Loading />
    }
    return (
      <article className="covid-tracker">
        { this.covidTrackerInfo() }
      </article>
    )
  }
}

export default CovidTracker

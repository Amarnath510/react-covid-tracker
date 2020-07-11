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
import { get } from 'lodash';

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
      lastUpdatedDate: null,
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
          statewise: CovidTrackerUtil.sortDataBy(get(covidData, 'statewise', [])),
          casesTimeSeries: get(covidData, 'cases_time_series', []),
          statesWithDistricts: statesWithDistricts,
          stateTimeline: stateTimeline,
          lastUpdatedDate: CovidTrackerUtil.getLastUpdatedDate(covidData.cases_time_series),
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
        <CovidTrackerHeader type="tracker" title= 'State-wise Cases' lastUpdatedDate={ this.state.lastUpdatedDate }/>
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

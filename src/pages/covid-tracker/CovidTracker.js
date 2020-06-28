import React, { Component } from 'react'
import CovidTrackerHeader from '../../components/covid-tracker-header/CovidTrackerHeader';
import CovidTrackerApi from '../../http/CovidTrackerApi';
import Loading from '../../components/loading/Loading';
import './CovidTracker.css';
import CovidTrackerSort from '../../components/covid-tracker-sort/CovidTrackerSort';
import CovidTrackerUtil from '../../util/CovidTrackerUtil';
import StateList from '../../components/state-list/StateList';

export class CovidTracker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      covidData: {},
      statewise: [],
      casesTimeSeries: [],
      statesWithDistricts: {},
      isLoading: true,
      showModal: false
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
      statewise: CovidTrackerUtil.sortDataBy(this.state.covidData.statewise, sortBy)
    });
  }

  covidTrackerInfo = () => {
    const { covidData, statewise, statesWithDistricts } = this.state;
    return <React.Fragment>
        <CovidTrackerHeader covidData={ covidData } />
        <CovidTrackerSort onSortChanged={ this.onSortChange }/>
        <StateList statewise={ statewise } statesWithDistricts={ statesWithDistricts }/>
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

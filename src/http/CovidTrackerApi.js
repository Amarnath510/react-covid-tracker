import axios from 'axios';

class CovidTrackerApi {

  INSTANCE = null;

  // Covid source: https://documenter.getpostman.com/view/10724784/SzYXXKmA?version=latest
  COVID_DATA_PATH = 'https://api.covid19india.org/data.json';
  COVID_STATE_DISTRICT_PATH = 'https://api.covid19india.org/state_district_wise.json';
  COVID_STATE_TIME_LINE = 'https://covid-india-cases.herokuapp.com/statetimeline/';

  fetchCovidCountryAndStateData() {
    return axios.all([
      this.fetchCovidData(),
      this.fetchCovidStatesDetails(),
      this.fetchStateTimeline()
    ])
  }

  fetchCovidData() {
    return axios.get(this.COVID_DATA_PATH);
  }
  
  fetchCovidStatesDetails() {
    return axios.get(this.COVID_STATE_DISTRICT_PATH);
  }

  fetchStateTimeline() {
    return axios.get(this.COVID_STATE_TIME_LINE);
  }

  static getInstance() {
    if (!this.INSTANCE) {
      this.INSTANCE = new CovidTrackerApi();
    }
    return this.INSTANCE;
  }
}

export default CovidTrackerApi

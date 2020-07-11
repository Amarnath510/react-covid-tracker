import React, { Component } from 'react'
import CovidHelpline from '../../components/covid-helpline/CovidHelpline'
import Loading from '../../components/loading/Loading';
import CovidTrackerApi from '../../http/CovidTrackerApi';
import { get } from 'lodash'

export class HelplineAndNotifications extends Component {

  constructor() {
    super();
    this.state = {
      contacts: [],
      primary: {},
      lastUpdatedDate: null,
      isLoading: false
    }
    this.covidApi = new CovidTrackerApi();
  }

  componentDidMount() {
    this.setState({ isLoading: true })    
    this.covidApi.fetchCovidHelpline()
      .then(resp => {
        const contactsResp = get(resp, 'data.data.contacts', {})
        this.setState({
          contacts: get(contactsResp, 'regional', []),
          primary: get(contactsResp, 'primary', {}),
          lastUpdatedDate: resp.data.lastRefreshed,
          isLoading: false
        })
      })
  }

  render() {
    if (this.state.isLoading) {
      return <Loading />
    }
    return (
      <article className="helpline-notifications">
        <CovidHelpline contacts={ this.state.contacts } lastUpdatedDate={ this.state.lastUpdatedDate }/>
      </article>
    )
  }
}

export default HelplineAndNotifications

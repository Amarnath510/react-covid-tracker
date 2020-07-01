class CovidTrackerUtil {

  static sortDataBy(statewise = [], sortBy = 'state') {
    let statesData = [...statewise];
    statesData = statesData.filter(stateData => {
      if (stateData.statecode === 'TT' || stateData.statecode === 'UN') {
        return false;
      }
      return true;
    });
    if (statesData && statesData.length) {
      const sortAttrAndOrder = sortBy.split('-');
      const attribute = sortAttrAndOrder[0];
      const order = sortAttrAndOrder.length > 1 ? sortAttrAndOrder[1] : null;
      return statesData.sort((s1, s2) => this.sortByGivenAttributeAndOrder(s1, s2, attribute, order));
    }
    return [];
  }

  static getLastUpdatedDate(casesTimeSeries = []) {
    const lastUpdatedSeries = casesTimeSeries.length ? casesTimeSeries[casesTimeSeries.length - 1] : null;
    if (lastUpdatedSeries) {
      return lastUpdatedSeries.date;
    }
    return 'NA';
  }

  static convertStringToNum(input) {
    return isNaN(input) ? input : parseInt(input, 10);
  }

  static sortByGivenAttributeAndOrder = (state1, state2, attribute, order = 'dec') => {
    const state1ActiveCases = this.convertStringToNum(state1[attribute]);
    const state2ActiveCases = this.convertStringToNum(state2[attribute]);
    if (state1ActiveCases > state2ActiveCases) {
      return order === 'dec' ? -1 : 1;
    } else if  (state1ActiveCases < state2ActiveCases) {
      return order === 'dec' ? 1 : -1;
    } else {
      return 0;
    }
  }

  static getTopDistrictsWithActiveCases(stateInfo, limit = 5) {
    const districtsData = stateInfo.districtData;
    if (stateInfo && districtsData) {
      const districts = [];
      Object.keys(districtsData)
        .forEach(district => {
          if (district !== 'Other State' && district !== 'Foreign Evacuees') {
            districts.push({
              name: district,
              active: districtsData[district].active,
              confirmed: districtsData[district].confirmed,
              recovered: districtsData[district].recovered,
              deceased: districtsData[district].deceased
            });
          }
        })
      return districts
        .sort((d1, d2) => this.sortByDistrictActiveCases(d1, d2))
        .slice(0, limit);
    }
    return [];
  }

  static sortByDistrictActiveCases(district1, district2, order = 'desc') {
    const district1Active = district1.active;
    const district2Active = district2.active;
    if (district1Active < district2Active) {
      return 1;
    } else if (district1Active > district2Active) {
      return -1;
    } else {
      return 0;
    }
  }
}

export default CovidTrackerUtil;

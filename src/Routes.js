import React from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CovidTracker from './pages/covid-tracker/CovidTracker';
import CovidAssessment from './pages/covid-assessment/CovidAssessment';

const Routes = () => (
  <Router>
    <div className="covid-tracker-app">
      <Header />
      <main className="covid-tracker-app__main">
        <Switch>
          <Route exact path="/" component={ CovidTracker }></Route>
          <Route exact path="/covid_assessment" component={ CovidAssessment }></Route>
        </Switch>
      </main>
      <Footer />
    </div>
  </Router>
);

export default Routes;

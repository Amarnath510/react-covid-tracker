import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './Header.css';

export class Header extends Component {

  isActive(path) {
    const currentPath = this.props.location.pathname;
    return path === currentPath;
  }

  render() {
    return (
      <header className="covid-tracker-app__header">
        <nav className="header__nav">
          <h1 className="header__title">
            <img src="images/covid.png" alt="" className="header__logo"/>
            <Link to="/" className="header__logo-link">Covid-19 Tracker (India)</Link>
          </h1>
          <ul className="header__nav-links">
            <li className="header__nav-link">
              <Link to="/" className={`link ${this.isActive('/') ? 'header__nav-link-active' : ''}`}>Stats</Link>
              <img src="images/growth.svg" className="covid-tracker-app__nav-icon" alt=""/>
            </li>
            <li className="header__nav-link">
              <Link to="/helpline" className={`link ${this.isActive('/helpline') ? 'header__nav-link-active' : ''}`}>Helpline</Link>
              <img src="images/phone.svg" className="covid-tracker-app__nav-icon" alt=""/>
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default withRouter(Header); // Header is not part of any Route so we don't get params
                                   // hence wrap the component with withRouter explicitly
                                   // now we can say props.location.pathname
                                   // https://stackoverflow.com/a/59247341/967638

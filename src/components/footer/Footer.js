import React, { Component } from 'react'
import './Footer.css'

export class Footer extends Component {
  render() {
    return (
      <footer className="covid-tracker-footer">
        <p className="text-light-gray">Data Source &nbsp;
          <a href="https://documenter.getpostman.com/view/10724784/SzYXXKmA?version=latest" target="_blank" rel="noopener noreferrer" className="external-link link">Postman COVID19-India API</a>
        </p>
        <p className="text-light-gray">Developed using &nbsp;
          <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer" className="external-link link">React</a>
        </p>
        <p className="text-light-gray">
          2020 &copy; Amarnath Chandana
        </p>
      </footer>
    )
  }
}

export default Footer;

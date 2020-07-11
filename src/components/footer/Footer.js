import React from 'react'
import './Footer.css'
import { withRouter } from 'react-router-dom'

const Footer = (props) => {
  
  const isActivePath = (inputPath) => {
    return props.location.pathname === inputPath
  }

  const getSourceBasedOnPath = () => {
    if (isActivePath('/')) {
      return <p className="text-light-gray">Data Source &nbsp;
          <a href="https://documenter.getpostman.com/view/10724784/SzYXXKmA?version=latest" target="_blank" rel="noopener noreferrer" className="external-link link">Postman COVID19-India API</a>
        </p>
    } else if (isActivePath('/helpline')) {
      return <p className="text-light-gray">Source &nbsp;
          <a href="https://api.rootnet.in/" target="_blank" rel="noopener noreferrer" className="external-link link">Ministry of Health</a>
        </p>
    }
  }

  return (
    <footer className="covid-tracker-footer">
      {
        getSourceBasedOnPath()
      }
      <p className="text-light-gray">Developed using &nbsp;
        <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer" className="external-link link">React</a>
      </p>
      <p className="text-light-gray">
        2020 &copy; Amarnath Chandana
        </p>
    </footer>
  )
}

export default withRouter(Footer);

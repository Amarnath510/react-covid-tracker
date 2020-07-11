import React from 'react'
import './CovidHelpline.css'
import CovidTrackerHeader from '../covid-tracker-header/CovidTrackerHeader'
import PropTypes from 'prop-types'

const CovidHelpline = (props) => {

  const convertISODateToSimpleFormat = () => {
    const iSODate = new Date(props.lastUpdatedDate);
    return `${iSODate.getDate()}-${iSODate.getMonth() + 1}-${iSODate.getFullYear()}`
  }

  const renderContactNumberAsLink = (contactNumbers = "") => {
    const regEx = new RegExp(/-/g);
    const contacts = contactNumbers.split(",");
    return contacts.map(contact => {
      const linkNumber = contact.replace(regEx, '');
      return <a href={`tel:${linkNumber}`} className="phone-number" key={linkNumber}>{contact} &nbsp; &nbsp;</a>
    });
  }

  return (
    <article className="covid-helpline">
      <CovidTrackerHeader type='helpline' title='Helpline Numbers' lastUpdatedDate={ convertISODateToSimpleFormat() } />
      <table className="covid-helpline__table">
        <thead>
          <tr className="covid-helpline__table-row">
            <td className="covid-helpline__table-data-header"><h3>State Name</h3></td>
            <td className="covid-helpline__table-data-header"><h3>Contact</h3></td>
          </tr>
        </thead>
        <tbody>
          {
            props.contacts.map(contact => {
              return <tr key={contact.loc} className="covid-helpline__table-row">
                <td className="covid-helpline__table-data">{contact.loc}</td>
                <td className="covid-helpline__table-data">{ renderContactNumberAsLink(contact.number) }</td>
              </tr>
            })
          }
        </tbody>
      </table>
    </article>
  )
}

CovidHelpline.propTypes = {
  contacts: PropTypes.array,
  lastUpdatedDate: PropTypes.string
}

export default CovidHelpline

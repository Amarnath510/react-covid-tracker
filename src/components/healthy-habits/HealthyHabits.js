import React, { Component } from 'react'
import './HealthyHabits.css'

export class HealthyHabits extends Component {

  constructor() {
    super()
    this.state = {
      closedHealthyHabits: true,
      contents: [
        {
          img: 'images/social-distancing.svg',
          title: 'Social Distancing'
        }
      ]
    }
  }

  componentDidMount() {
    this.setState({
      closedHealthyHabits: false
    })
  }

  closeHealthyHabits() {
    this.setState({
      closedHealthyHabits: true
    })
  }

  render() {
    return (
      <article className={`healthy-habits ${ this.state.closedHealthyHabits ? 'healthy-habits__hidden' : '' }`}>
        <header className="healthy-habits__header">
          <button type="button" onClick={this.closeHealthyHabits.bind(this)} className="healthy-habits__close text-light-gray">X</button>
        </header>
        <section className="healthy-habits__content">
          <ul className="healthy-habits__list">
            {
              this.state.contents.map(content => {
                return <li key={ content.title } className="healthy-habits__list-item">
                    <img className="healthy-habits__img" src={ content.img }></img>
                    <h3 className="healthy-habits__img-title text-light-gray">{ content.title }</h3>
                </li>
              })
            }
          </ul>  
        </section>
      </article>
    )
  }
}

export default HealthyHabits

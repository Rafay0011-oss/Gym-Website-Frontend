import React from 'react'
import "./Card.css"

const Card = (props) => {
  return (
    <div className="service-card">
      <img src={props.image} alt={props.title} className="card-img" />
      <h3 className="card-title">{props.title}</h3>
      <p className="card-desc">{props.description}</p>
    </div>
  )
}


export default Card

import { NavLink } from "react-router-dom";

import React from 'react'

const EventCard = ({event}) => {
  return (
    <div>
        <h3>{event.title}</h3>
        <p>{event.description}</p>
        <p><strong>Date: </strong> {new Date(event.date).toDateString()}</p>

        <NavLink to={`/event/${event._id}`}>View Details</NavLink>
    </div>
  )
}

export default EventCard
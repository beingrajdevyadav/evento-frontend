import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  const getEvent = async (id) => {
    try {

      const res = await axios.get(`https://evento-r1nz.onrender.com/api/events/${id}`);
      setEvent(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error fetching event", error);
    }
  };

  const bookTicket = async () => {
    try {
      const res = await axios.post("https://evento-r1nz.onrender.com/api/bookings", {
        eventId: id
      }, { headers: { Authorization: user?.token }, });

      console.log("Ticket booked successfully", res.data);
    } catch (error) {
      console.log("Booking failed", error);
    }
  };

  useEffect(() => {
    getEvent(id);
  }, [id]);

  if (loading) return <p>Loading event...</p>;
  if (!event) return <p>No event found.</p>;

  return (
    <div>
      <h2>{event.title}</h2>
      <hr />
      <p>{event.description}</p>
      <p><strong>Date : </strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Time : </strong> {event.time}</p>
      <p><strong>Venue :</strong> {event.venue}</p>
      <p><strong>Tickets Left : </strong> {event.ticketsAvailable - event.ticketsBooked}</p>

      <br />
      <hr />
      <br />
      {
        user?(
          <button onClick={bookTicket}>Book Ticket</button>
        ): 
        (
          <p>Please, login to book a ticket.</p>
        )
      }
    </div>
  )
}

export default EventDetails
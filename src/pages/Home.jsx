import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEvents } from '../features/event/eventSlice'
import EventCard from '../components/EventCard'


const Home = () => {
  const dispatch = useDispatch();
  const {events, loading, error} = useSelector((state)=>state.event);

  useEffect(()=>{
    dispatch(fetchEvents());
  }, [dispatch]);

  if(loading) return <p>Loading events...</p>;

  if(error) return <p>{error}</p>;

  return (
    <div>
      <h2>Upcoming Events</h2>
      <hr />

      {
        events.length === 0 ? ( 
          <p> No events available </p>
        ):
      (
        events.map((e)=><EventCard key={e._id} event={e}/>)
      )
      }
    </div>
  )
}

export default Home
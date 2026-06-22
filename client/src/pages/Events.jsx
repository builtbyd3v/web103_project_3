import React, { useState, useEffect } from 'react'
import EventsAPI from '../services/EventsAPI'
import LocationsAPI from '../services/LocationsAPI'
import Event from '../components/Event'
import '../css/Events.css'

const Events = () => {
    const [events, setEvents] = useState([])
    const [locations, setLocations] = useState([])
    const [filter, setFilter] = useState('all')   // 'all' or a location id

    useEffect(() => {
        (async () => {
            try {
                setEvents(await EventsAPI.getAllEvents())
                setLocations(await LocationsAPI.getAllLocations())
            }
            catch (error) {
                console.error(error)
            }
        }) ()
    }, [])

    const shown = filter === 'all'
        ? events
        : events.filter(event => String(event.location_id) === String(filter))

    const sorted = [...shown].sort((a, b) => new Date(a.date) - new Date(b.date))

    return (
        <div className='events-page'>
            <div className='events-controls'>
                <label htmlFor='location-filter'>Filter by location: </label>
                <select
                    id='location-filter'
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value='all'>All locations</option>
                    {locations.map(location =>
                        <option key={location.id} value={location.id}>{location.name}</option>
                    )}
                </select>
            </div>

            <main className='events-list'>
                {
                    sorted.length > 0 ? sorted.map(event =>
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> No events found.</h2>
                }
            </main>
        </div>
    )
}

export default Events

const URL = '/api/events'

const getAllEvents = async () => {
    const response = await fetch(URL)
    if (!response.ok) {
        throw new Error('Failed to fetch events')
    }
    return response.json()
}

const getEventsById = async (id) => {
    const response = await fetch(`${URL}/${id}`)
    if (!response.ok) {
        throw new Error('Failed to fetch event by id')
    }
    return response.json()
}

const getEventsByLocation = async (locationId) => {
    const response = await fetch(`${URL}/location/${locationId}`)
    if (!response.ok) {
        throw new Error('Failed to fetch events by location')
    }
    return response.json()
}

export default { getAllEvents, getEventsById, getEventsByLocation }
const URL = '/api/locations'

const getAllLocations = async () => {
    const response = await fetch(URL)
    if (!response.ok) {
        throw new Error('Failed to fetch locations')
    }
    return response.json()
}

const getLocation = async (id) => {
    const response = await fetch(`${URL}/${id}`)
    if (!response.ok) {
        throw new Error('Failed to fetch location')
    }
    return response.json()
}

export default { getAllLocations, getLocation }
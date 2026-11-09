import api from './api'

// GET /venues - every venue (public, no login needed)
async function getAllVenues() {
    const response = await api.get('/venues')
    return response.data
}

async function getAllVenues(id) {
    const response = await api.get(`/venues/${id}`)
    return response.data
}

async function createVenue(formData) {
    const response = await api.post('/venues',formData)
    return response.data
}

async function editVenue(id,formData) {
    const response = await api.put(`/venues/${id}`,formData)
    return response.data
}

export {
    getAllVenues,
    createVenue,
    editVenue
}

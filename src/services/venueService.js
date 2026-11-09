import api from './api'

async function getAllVenues() {
    const response = await api.get('/venues')
    return response.data
}

async function getVenueById(id) {
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

async function deleteVenue(id) {
    const response = await api.delete(`/venues/${id}`)
    return response.data
}



export {
    getAllVenues,
    createVenue,
    editVenue,
    getVenueById,
    deleteVenue
}

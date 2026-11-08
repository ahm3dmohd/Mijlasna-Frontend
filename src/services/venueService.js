import api from './api'

// GET /venues - every venue (public, no login needed)
async function getAllVenues() {
    const response = await api.get('/venues')
    return response.data
}


async function createVenue(formData) {
    const response = await api.create('/venues',formData)
    return response.data
}

export {
    getAllVenues,
    createVenue
}

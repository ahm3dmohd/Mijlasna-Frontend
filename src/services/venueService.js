import api from './api'

// GET /venues - every venue (public, no login needed)
async function getAllVenues() {
    const response = await api.get('/venues')
    return response.data
}

export {
    getAllVenues
}

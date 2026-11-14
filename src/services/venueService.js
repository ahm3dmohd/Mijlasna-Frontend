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
    const response = await api.post('/venues', formData)
    return response.data
}

async function editVenue(id, formData) {
    const response = await api.put(`/venues/${id}`, formData)
    return response.data
}

async function deleteVenue(id) {
    const response = await api.delete(`/venues/${id}`)
    return response.data
}

async function getReviews(id) {
    const response = await api.get(`/venues/${id}/reviews`)
    return response.data
}

async function createReview(id, formData) {
    const response = await api.post(`/venues/${id}/reviews`, formData)
    return response.data
}

async function deleteReview(id, reviewId) {
    const response = await api.delete(`/venues/${id}/reviews/${reviewId}`)
    return response.data
}

async function getBlockedDates(id) {
    const response = await api.get(`/venues/${id}/blocked-dates`)
    return response.data
}

async function createBlockedDate(id, formData) {
    const response = await api.post(`/venues/${id}/blocked-dates`, formData)
    return response.data
}

async function editBlockedDate(id, blockedId, formData) {
    const response = await api.put(`/venues/${id}/blocked-dates/${blockedId}`, formData)
    return response.data
}

async function deleteBlockedDate(id, blockedId) {
    const response = await api.delete(`/venues/${id}/blocked-dates/${blockedId}`)
    return response.data
}


export {
    getAllVenues,
    createVenue,
    editVenue,
    getVenueById,
    deleteVenue,
    getReviews,
    createReview,
    deleteReview,
    getBlockedDates,
    createBlockedDate,
    editBlockedDate,
    deleteBlockedDate
}

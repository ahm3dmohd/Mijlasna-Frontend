import api from './api'

export async function getAllBookings() {
  const res = await api.get('/bookings')
  return res.data
}

export async function createBooking(venueId, formData) {
  const res = await api.post(`/venues/${venueId}/booking`, formData)
  return res.data
}

export async function ownerGetBookings() {
  const res = await api.get('/bookings/owner')
  return res.data
}

export async function getBookingById(id) {
  const res = await api.get(`/bookings/${id}`)
  return res.data
}

export async function updateBooking(id, formData) {
  const res = await api.put(`/bookings/${id}`, formData)
  return res.data
}

export async function updateBookingStatus(id, status) {
  const res = await api.put(`/bookings/${id}/status`, { status })
  return res.data
}

export async function checkoutBooking(id) {
  const res = await api.post(`/bookings/${id}/checkout`)
  return res.data
}

export async function deleteBooking(id) {
  const res = await api.delete(`/bookings/${id}`)
  return res.data
}

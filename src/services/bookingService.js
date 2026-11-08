import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/booking`;

function getAuthConfig() {
  const token = localStorage.getItem('token');
  return {
    headers: { Authorization: `Bearer ${token}` }
  };
}

export async function getAllBookings() {
  const res = await axios.get(BASE_URL, getAuthConfig());
  return res.data;
}

export async function getBookingById(id) {
  const res = await axios.get(`${BASE_URL}/${id}`, getAuthConfig());
  return res.data;
}

export async function updateBooking(id, formData) {
  const res = await axios.put(`${BASE_URL}/${id}`, formData, getAuthConfig());
  return res.data;
}

export async function updateBookingStatus(id, status) {
  const res = await axios.put(`${BASE_URL}/${id}/status`, { status }, getAuthConfig());
  return res.data;
}

export async function checkoutBooking(id) {
  const res = await axios.post(`${BASE_URL}/${id}/checkout`, {}, getAuthConfig());
  return res.data;
}

export async function deleteBooking(id) {
  const res = await axios.delete(`${BASE_URL}/${id}`, getAuthConfig());
  return res.data;
}
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { getBookingById, updateBooking } from '../../services/bookingService'

function EditBookingPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    date: '',
    timeOfDay: 'Morning 7 to 12',
    notes: '',
  })

  useEffect(() => {
    async function loadBooking() {
      try {
        const booking = await getBookingById(id)
        setFormData({
          // the date input needs the format YYYY-MM-DD
          date: booking.date.slice(0, 10),
          timeOfDay: booking.timeOfDay,
          notes: booking.notes || '',
        })
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to load booking.')
      }
    }
    loadBooking()
  }, [id])

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      await updateBooking(id, formData)
      navigate(`/bookings/${id}`)
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to update booking.')
    }
  }

  return (
    <main>
      <h1>Edit Booking</h1>
      <p className='error'>{error}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='date'>Date:</label>
          <input
            type='date'
            id='date'
            value={formData.date}
            name='date'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='timeOfDay'>Time:</label>
          <select id='timeOfDay' value={formData.timeOfDay} name='timeOfDay' onChange={handleChange}>
            <option value='Morning 7 to 12'>Morning 7 to 12</option>
            <option value='Evening 7 to 12'>Evening 7 to 12</option>
          </select>
        </div>
        <div>
          <label htmlFor='notes'>Notes:</label>
          <textarea
            id='notes'
            value={formData.notes}
            name='notes'
            onChange={handleChange}
          />
        </div>
        <div>
          <button type='submit'>Save Changes</button>
          <Link to={`/bookings/${id}`}>Cancel</Link>
        </div>
      </form>
    </main>
  )
}

export default EditBookingPage

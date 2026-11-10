import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { getAllBookings } from '../../services/bookingService'

function MyBookingsPage() {
  const [bookings, setBookings] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadBookings() {
      try {
        const allBookings = await getAllBookings()
        setBookings(allBookings)
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to load bookings.')
      }
      setLoading(false)
    }
    loadBookings()
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <main>
      <h1>My Bookings</h1>
      <p className='error'>{error}</p>

      {bookings.length === 0 && !error && <p>You have no bookings yet.</p>}

      {bookings.map((booking) => (
        <div key={booking._id}>
          <h2>{booking.venue ? booking.venue.name : 'Deleted venue'}</h2>
          <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {booking.timeOfDay}</p>
          <p><strong>Status:</strong> {booking.status}</p>
          <Link to={`/bookings/${booking._id}`}>View Details</Link>
        </div>
      ))}
    </main>
  )
}

export default MyBookingsPage

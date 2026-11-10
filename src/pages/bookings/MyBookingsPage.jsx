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
      <div className='page-head'>
        <h1>My Bookings</h1>
        <Link to='/venues' className='btn'>Book a Venue</Link>
      </div>
      <p className='error'>{error}</p>

      {bookings.length === 0 && !error && <p>You have no bookings yet.</p>}

      <div className='card-grid'>
      {bookings.map((booking) => (
        <div key={booking._id} className='card'>
          <div className='card-head'>
            <h2>{booking.venue ? booking.venue.name : 'Deleted venue'}</h2>
            <span className={`badge status-${booking.status}`}>{booking.status}</span>
          </div>
          <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {booking.timeOfDay}</p>
          <Link to={`/bookings/${booking._id}`} className='btn-secondary card-link'>View Details</Link>
        </div>
      ))}
      </div>
    </main>
  )
}

export default MyBookingsPage

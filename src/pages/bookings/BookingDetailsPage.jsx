import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { getBookingById, updateBookingStatus, deleteBooking } from '../../services/bookingService'

function BookingDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [booking, setBooking] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadBooking() {
      try {
        const foundBooking = await getBookingById(id)
        setBooking(foundBooking)
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to load booking.')
      }
    }
    loadBooking()
  }, [id])

  async function handleCancel() {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return
    try {
      const updatedBooking = await updateBookingStatus(id, 'cancelled')
      setBooking({ ...booking, status: updatedBooking.status })
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to cancel booking.')
    }
  }

  async function handleDelete() {
    if (!window.confirm('Are you sure you want to delete this booking?')) return
    try {
      await deleteBooking(id)
      navigate('/bookings')
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to delete booking.')
    }
  }

  if (!booking && error) return <p className='error'>{error}</p>
  if (!booking) return <p>Loading...</p>

  return (
    <main>
      <h1>Booking Details</h1>
      <p className='error'>{error}</p>

      <p><strong>Venue:</strong> {booking.venue ? booking.venue.name : 'Deleted venue'}</p>
      <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
      <p><strong>Time:</strong> {booking.timeOfDay}</p>
      <p><strong>Total price:</strong> {booking.totalPrice} BD</p>
      <p><strong>Status:</strong> {booking.status}</p>
      <p><strong>Deposit paid:</strong> {booking.deposit ? 'Yes' : 'No'}</p>
      <p><strong>Notes:</strong> {booking.notes || 'No notes'}</p>

      <div>
        <Link to={`/bookings/${booking._id}/edit`}>Edit</Link>
        {(booking.status === 'pending' || booking.status === 'confirmed') && (
          <button onClick={handleCancel}>Cancel Booking</button>
        )}
        <button onClick={handleDelete}>Delete</button>
        <Link to='/bookings'>Back</Link>
      </div>
    </main>
  )
}

export default BookingDetailsPage

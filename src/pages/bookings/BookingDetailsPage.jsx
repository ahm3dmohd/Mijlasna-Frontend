import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { getBookingById, updateBookingStatus, deleteBooking, checkoutBooking } from '../../services/bookingService'

function BookingDetailsPage({ user }) {
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

  async function handleCheckout() {
    try {
      setError('')
      const paidBooking = await checkoutBooking(id)
      setBooking({ ...booking, deposit: paidBooking.deposit })
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to checkout.')
    }
  }

  async function handleCancel() {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return
    try {
      setError('')
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

  const isActive = booking.status === 'pending' || booking.status === 'confirmed'
  // the checkout route only accepts the customer who made the booking
  const isCustomer = booking.customer && booking.customer._id === user._id
  const isAdmin = user.role === 'admin'

  // Checkout comes first. Once the booking is checked out, it is replaced by Cancel.
  const showCheckout = isCustomer && isActive && !booking.deposit
  const showCancel = isActive && ((isCustomer && booking.deposit) || isAdmin)

  return (
    <main>
      <h1>Booking Details</h1>
      <p className='error'>{error}</p>

      <div className='card details'>
        <div className='card-head'>
          <h2>{booking.venue ? booking.venue.name : 'Deleted venue'}</h2>
          <span className={`badge status-${booking.status}`}>{booking.status}</span>
        </div>

        <dl className='detail-list'>
          {/* owners and admins see who made the booking */}
          {!isCustomer && booking.customer && (
            <div>
              <dt>Customer</dt>
              <dd>{booking.customer.username}</dd>
            </div>
          )}
          <div>
            <dt>Date</dt>
            <dd>{new Date(booking.date).toLocaleDateString(undefined, { timeZone: 'UTC' })}</dd>
          </div>
          <div>
            <dt>Time</dt>
            <dd>{booking.timeOfDay}</dd>
          </div>
          <div>
            <dt>Total price</dt>
            <dd>{booking.totalPrice} BD</dd>
          </div>
          <div>
            <dt>Deposit paid</dt>
            <dd>{booking.deposit ? 'Yes' : 'No'}</dd>
          </div>
          <div>
            <dt>Notes</dt>
            <dd>{booking.notes || 'No notes'}</dd>
          </div>
        </dl>

        <div className='actions'>
          <Link to={`/bookings/${booking._id}/edit`}>Edit</Link>
          {showCheckout && (
            <button onClick={handleCheckout}>Checkout</button>
          )}
          {showCancel && (
            <button onClick={handleCancel}>Cancel Booking</button>
          )}
          {/* no escape before checkout: Delete only appears once the booking is checked out */}
          {booking.deposit && (
            <button className='btn-danger' onClick={handleDelete}>Delete</button>
          )}
          <Link to='/bookings'>Back</Link>
        </div>
      </div>
    </main>
  )
}

export default BookingDetailsPage

import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { ownerGetBookings, updateBookingStatus, deleteBooking } from '../../services/bookingService'

const NEXT_STATUS = {
  pending: [
    { status: 'confirmed', label: 'Confirm' },
    { status: 'rejected', label: 'Reject', danger: true },
  ],
  confirmed: [
    { status: 'completed', label: 'Complete' },
    { status: 'rejected', label: 'Reject', danger: true },
  ],
  rejected: [
    { status: 'confirmed', label: 'Confirm' },
  ],
}

function OwnerVenuesBooking() {

  const [bookings, setBookings] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getBookings() {
      try {
        const res = await ownerGetBookings()
        setBookings(res)
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load bookings.")
      }
      setLoading(false)
    }
    getBookings()
  }, [])

  async function changeStatus(bookingId, status) {
    try {
      setError("")
      const updated = await updateBookingStatus(bookingId, status)
      setBookings((current) =>
        current.map((one) => (one._id === bookingId ? { ...one, status: updated.status } : one))
      )
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to update the booking.")
    }
  }

  async function handleDelete(bookingId) {
    if (!window.confirm("Are you sure you want to delete this booking?")) return
    try {
      setError("")
      await deleteBooking(bookingId)
      setBookings((current) => current.filter((one) => one._id !== bookingId))
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete the booking.")
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <main>

      <h1>Venue Bookings</h1>
      <p className="error">{error}</p>

      {bookings.length === 0 && !error && <p>No bookings made on your venues yet.</p>}

      <div className="card-grid">
        {bookings.map((oneBooking) => (
          <div key={oneBooking._id} className="card">
            <div className="card-head">
              <h2>{oneBooking.venue ? oneBooking.venue.name : "Deleted venue"}</h2>
              <span className={`badge status-${oneBooking.status}`}>{oneBooking.status}</span>
            </div>
            <p><strong>Customer:</strong> {oneBooking.customer ? oneBooking.customer.username : "Deleted user"}</p>
            {oneBooking.customer && oneBooking.customer.phone && (
              <p><strong>Phone:</strong> {oneBooking.customer.phone}</p>
            )}
            <p><strong>Date:</strong> {new Date(oneBooking.date).toLocaleDateString(undefined, { timeZone: 'UTC' })}</p>
            <p><strong>Time:</strong> {oneBooking.timeOfDay}</p>
            <p><strong>Total price:</strong> {oneBooking.totalPrice} BD</p>
            <p><strong>Deposit paid:</strong> {oneBooking.deposit ? "Yes" : "No"}</p>

            <div className="actions">
              {(NEXT_STATUS[oneBooking.status] || []).map((next) => (
                <button
                  key={next.status}
                  className={next.danger ? "btn-danger" : ""}
                  onClick={() => changeStatus(oneBooking._id, next.status)}
                >
                  {next.label}
                </button>
              ))}
              <button className="btn-danger" onClick={() => handleDelete(oneBooking._id)}>Delete</button>
              <Link to={`/bookings/${oneBooking._id}`}>See Details</Link>
            </div>
          </div>
        ))}
      </div>

    </main>
  )
}

export default OwnerVenuesBooking

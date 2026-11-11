import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { getVenueById, getBlockedDates, createBlockedDate, editBlockedDate } from '../../services/venueService'

// One page for both adding (/venues/:id/blocked-dates/new)
// and editing (/venues/:id/blocked-dates/:bid/edit) a blocked date
function BlockedDateForm({ user }) {
  const { id, bid } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(bid)

  const [formData, setFormData] = useState({
    date: '',
    timeOfDay: '',
    reasonCategory: 'Private Booking',
    reason: '',
  })
  const [error, setError] = useState('')

  // only the venue's owner and admins can block dates on it
  useEffect(() => {
    async function checkOwner() {
      try {
        const venue = await getVenueById(id)
        if (user.role !== 'admin' && venue.owner !== user._id) {
          navigate(`/venues/${id}`, { replace: true })
        }
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to load venue.')
      }
    }
    checkOwner()
  }, [id, user, navigate])

  useEffect(() => {
    if (!isEditing) return

    async function loadBlockedDate() {
      try {
        // the backend has no route for one blocked date, so find it in the venue's list
        const all = await getBlockedDates(id)
        const found = all.find((one) => one._id === bid)
        if (!found) {
          setError('Blocked date not found.')
          return
        }
        setFormData({
          // the date input needs the format YYYY-MM-DD
          date: found.date.slice(0, 10),
          timeOfDay: found.timeOfDay,
          reasonCategory: found.reasonCategory || 'Private Booking',
          reason: found.reason || '',
        })
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to load blocked date.')
      }
    }
    loadBlockedDate()
  }, [id, bid, isEditing])

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      if (isEditing) {
        await editBlockedDate(id, bid, formData)
      } else {
        await createBlockedDate(id, formData)
      }
      navigate(`/venues/${id}`)
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to save blocked date.')
    }
  }

  // the backend does not accept a date in the past
  const today = new Date().toISOString().slice(0, 10)

  return (
    <main>
      <h1>{isEditing ? 'Edit Blocked Date' : 'Add Blocked Date'}</h1>
      <p className='error'>{error}</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='date'>Date:</label>
          <input
            type='date'
            name='date'
            id='date'
            min={today}
            onChange={handleChange}
            value={formData.date}
            required
          />
        </div>

        <div>
          <label htmlFor='timeOfDay'>Time Of Day:</label>
          <select id='timeOfDay' name='timeOfDay' onChange={handleChange} value={formData.timeOfDay} required>
            <option value='' disabled>Choose Timing...</option>
            <option value='Morning 7 to 12'>Morning 7 to 12</option>
            <option value='Evening 7 to 12'>Evening 7 to 12</option>
          </select>
        </div>

        <div>
          <label htmlFor='reasonCategory'>Reason Category:</label>
          <select id='reasonCategory' name='reasonCategory' onChange={handleChange} value={formData.reasonCategory}>
            <option value='Maintenance'>Maintenance</option>
            <option value='Holiday'>Holiday</option>
            <option value='Private Booking'>Private Booking</option>
            <option value='Renovation'>Renovation</option>
            <option value='Other'>Other</option>
          </select>
        </div>

        <div>
          <label htmlFor='reason'>Reason:</label>
          <textarea
            name='reason'
            id='reason'
            maxLength={255}
            onChange={handleChange}
            value={formData.reason}
          />
        </div>

        <div className='actions'>
          <button type='submit'>{isEditing ? 'Save Changes' : 'Block Date'}</button>
          <Link to={`/venues/${id}`}>Cancel</Link>
        </div>
      </form>
    </main>
  )
}

export default BlockedDateForm

import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { getAllVenues } from '../../services/venueService'

function VenuesPage({ user }) {
  const [venues, setVenues] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadVenues() {
      try {
        const allVenues = await getAllVenues()
        setVenues(allVenues)
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to load venues.')
      }
      setLoading(false)
    }
    loadVenues()
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <main>
      <div className='page-head'>
        <h1>Venues</h1>
        {user && (user.role === 'owner' || user.role === 'admin') && (
          <Link to='/venues/new' className='btn'>Create Venue</Link>
        )}
      </div>
      <p className='error'>{error}</p>

      {venues.length === 0 && !error && <p>No venues yet.</p>}

      <div className='card-grid'>
      {venues.map((venue) => (
        <div key={venue._id} className='card'>
          <div className='card-head'>
            <h2>{venue.name}</h2>
            <span className='badge'>{venue.type}</span>
          </div>
          <p><strong>Address:</strong> {venue.address}</p>
          <p><strong>Capacity:</strong> {venue.capacity} guests</p>
          <div className='price-row'>
            <div>
              <span className='price-label'>Weekday</span>
              <span className='price'>{venue.weekDayPrice} BD</span>
            </div>
            <div>
              <span className='price-label'>Weekend</span>
              <span className='price'>{venue.weekendPrice} BD</span>
            </div>
          </div>
          <Link to={`/venues/${venue._id}`} className='btn-secondary card-link'>View Details</Link>
        </div>
      ))}
      </div>
    </main>
  )
}

export default VenuesPage

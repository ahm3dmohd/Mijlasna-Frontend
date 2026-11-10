import { useEffect, useState } from 'react'
import { getAllVenues } from '../../services/venueService'

function VenuesPage() {
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
      <h1>Venues</h1>
      <p className='error'>{error}</p>

      {venues.length === 0 && !error && <p>No venues yet.</p>}

      <div className='card-grid'>
      {venues.map((venue) => (
        <div key={venue._id} className='card'>
          <h2>{venue.name}</h2>
          <p><strong>Type:</strong> {venue.type}</p>
          <p><strong>Address:</strong> {venue.address}</p>
          <p><strong>Capacity:</strong> {venue.capacity}</p>
          <p><strong>Weekday price:</strong> {venue.weekDayPrice} BD</p>
          <p><strong>Weekend price:</strong> {venue.weekendPrice} BD</p>
        </div>
      ))}
      </div>
    </main>
  )
}

export default VenuesPage

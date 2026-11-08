import { useEffect, useState } from "react";
import { getAllVenues } from "../services/venueService";

function VenuesPage() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch the venues once, when the page opens
  useEffect(() => {
    async function fetchVenues() {
      try {
        const data = await getAllVenues();
        setVenues(data);
      } catch (err) {
        setError(err.response?.data?.message || "Could not load venues.");
      } finally {
        setLoading(false);
      }
    }
    fetchVenues();
  }, []);

  if (loading) return <p>Loading venues...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <main>
      <h1>Venues</h1>

      {venues.length === 0 ? (
        <p>No venues yet.</p>
      ) : (
        <ul>
          {venues.map((venue) => (
            <li key={venue._id}>
              <h2>{venue.name}</h2>
              {venue.images && <img src={venue.images} alt={venue.name} width="200" />}
              <p>Type: {venue.type}</p>
              <p>Address: {venue.address}</p>
              <p>Capacity: {venue.capacity}</p>
              <p>Weekday price: {venue.weekDayPrice} BD</p>
              <p>Weekend price: {venue.weekendPrice} BD</p>
              {venue.description && <p>{venue.description}</p>}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default VenuesPage;

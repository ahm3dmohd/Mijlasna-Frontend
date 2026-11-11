import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getVenueById, deleteVenue } from "../../services/venueService";

function VenueDetailsPage({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getVenue() {
      try {
        const res = await getVenueById(id);
        setVenue(res);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load venue.");
      }
    }
    getVenue();
  }, [id]);

  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this venue?")) return;
    try {
      await deleteVenue(id);
      navigate("/venues");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete venue.");
    }
  }

  if (error && !venue) {
    return <p className="error">{error}</p>;
  }

  if (!venue) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  // the venue owner (or an admin) can edit and delete this venue
  const isOwner = user && (venue.owner === user._id || user.role === "admin");

  return (
    <div>

      <h1>Venue Details</h1>
      <p className="error">{error}</p>

      <h2>{venue.name}</h2>
      <p>Type: {venue.type}</p>
      <p>Description: {venue.description}</p>
      <p>Address: {venue.address}</p>
      <p>Capacity: {venue.capacity}</p>
      <p>Weekday Price: {venue.weekDayPrice}</p>
      <p>Weekend Price: {venue.weekendPrice}</p>
      
      <div className="actions">
        {user && user.role === "customer" && (
          <button onClick={() => navigate(`/venues/${id}/book`)}>Book Venue</button>
        )}

        {isOwner && (
          <>
            <button onClick={() => navigate(`/venues/${id}/edit`)}>Edit Venue</button>
            <button className="btn-danger" onClick={handleDelete}>Delete Venue</button>
          </>
        )}
      </div>
        {venue.images && (
        <div className="venue-image-container">
          <img 
            src={venue.images} 
            alt={venue.name} 
            style={{ maxWidth: '400px', width: '100%', height: 'auto', borderRadius: '8px' }} 
          />
        </div>
      )}
    </div>
  );
}

export default VenueDetailsPage;

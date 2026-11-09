import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getVenueById, deleteVenue } from "../../services/venueService";

function VenueDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState(null);

  async function getVenue() {
    try {
      const res = await getVenueById(id);
      setVenue(res);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getVenue();
  }, [id]);

  async function handleDelete() {
    try {
      await deleteVenue(id);
      navigate("/venues");
    } catch (err) {
      console.log(err);
    }
  }

  if (!venue) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>

      <h1>Venue Details</h1>

      <h2>{venue.name}</h2>
      <p>Type: {venue.type}</p>
      <p>Description: {venue.description}</p>
      <p>Address: {venue.address}</p>
      <p>Capacity: {venue.capacity}</p>
      <p>Weekday Price: {venue.weekDayPrice}</p>
      <p>Weekend Price: {venue.weekendPrice}</p>

      {user.role === "customer" && (
        <button onClick={() => navigate(`/venues/${id}/book`)}>Book Venue</button>
      )}

      {isOwner && (
        <>
          <button onClick={() => navigate(`/venues/${id}/edit`)}>Edit Venue</button>
          <button onClick={handleDelete}>Delete Venue</button>
        </>
      )}

    </div>
  );
}

export default VenueDetailsPage;
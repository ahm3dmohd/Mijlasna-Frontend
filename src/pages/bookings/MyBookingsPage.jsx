import { useEffect, useState } from "react";
import { getAllBookings } from "../../services/bookingService";

function MyBookingsPage() {

  const [bookings, setBookings] = useState([]);

  async function getBookings() {
    const res = await getAllBookings();
    setBookings(res);
  }
 
  useEffect(() => {
    getBookings();
  }, []);

  return (
    <div>

      <h1>My Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings made yet</p>
      ) : (
        <ol>
          {bookings.map((oneBooking) => (
            <li key={oneBooking._id}>
              <h2>{oneBooking.venue ? oneBooking.venue.name : "Venue"}</h2>
              <p>Date: {new Date(oneBooking.date).toLocaleDateString()}</p>
              <p>Time of Day: {oneBooking.timeOfDay}</p>
              <p>Total Price: {oneBooking.totalPrice}</p>
            </li>
          ))}
        </ol>
      )}

    </div>
  );
}

export default MyBookingsPage;
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getBookingById, deleteBooking, checkoutBooking } from "../../services/bookingService";

function BookingDetailsPage() {
    
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);

  async function getBooking() {
    try {
      const res = await getBookingById(id);
      setBooking(res);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getBooking();
  }, [id]);

  async function handleCheckout() {
    try {
      const res = await checkoutBooking(id);
      setBooking(res);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete() {
    try {
      await deleteBooking(id);
      navigate("/bookings");
    } catch (err) {
      console.log(err);
    }
  }

  if (!booking) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>

      <h1>Booking Details</h1>

      <h2>{booking.venue ? booking.venue.name : "Venue"}</h2>
      <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
      <p>Time of Day: {booking.timeOfDay}</p>
      <p>Total Price: {booking.totalPrice}</p>
      <p>Status: {booking.status}</p>
      <p>Payment Status: {booking.paymentStatus ? "Paid" : "Pending"}</p>
      <p>Deposit Paid: {booking.deposit ? "Yes" : "No"}</p>
      {booking.notes && (
        <p>Notes: {booking.notes}</p>
      )}
      
      {!booking.deposit && (
        <button onClick={handleCheckout}>Checkout</button>
      )}

      <button onClick={handleDelete}>Delete Booking</button>

    </div>
  );
}

export default BookingDetailsPage;
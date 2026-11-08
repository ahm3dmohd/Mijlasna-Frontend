import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getBookingById, updateBooking } from "../../services/bookingService";

function EditBookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
        date: "",
        timeOfDay: "",
        notes: ""
      });

  async function getBooking() {
    const res = await getBookingById(id);
    setFormData({
      date: res.date ? res.date.split("T")[0] : "",
      timeOfDay: res.timeOfDay || "",
      notes: res.notes || ""
    });
  }

  useEffect(() => {
    getBooking();
  }, [id]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await updateBooking(id, formData);
    navigate("/bookings/" + res._id);
  }

  return (
    <div>

      <h1>Edit Booking</h1>

      <form onSubmit={handleSubmit}>

        <label htmlFor="date">Date:</label>
        <input
          type="date"
          name="date"
          id="date"
          onChange={handleChange}
          value={formData.date}
        />

        <label htmlFor="timeOfDay">Time of Day:</label>
        <select
          name="timeOfDay"
          id="timeOfDay"
          onChange={handleChange}
          value={formData.timeOfDay}
        >
          <option value="">Select Time of Day</option>
          <option value="Morning 7 to 12">Morning 7 to 12</option>
          <option value="Evening 7 to 12">Evening 7 to 12</option>
        </select>

        <label htmlFor="notes">Notes:</label>
        <textarea
          name="notes"
          id="notes"
          onChange={handleChange}
          value={formData.notes}
        ></textarea>

        <button type="submit">Update Booking</button>

      </form>

    </div>
  );
}

export default EditBookingPage;
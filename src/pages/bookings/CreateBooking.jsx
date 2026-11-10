import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { createBooking } from '../../services/bookingService';

function CreateBooking() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        date: "",
        timeOfDay: "",
        notes: ""
    });
    const [error, setError] = useState("");

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await createBooking(id, formData);
            navigate("/bookings");
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to create booking.");
        }
    }

    return (
        <div>
            <h1>Create Booking</h1>
            <p className="error">{error}</p>

            <form onSubmit={handleSubmit}>

                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    name="date"
                    id="date"
                    onChange={handleChange}
                    value={formData.date}
                    required
                />

                <label htmlFor="timeOfDay">Time Of Day: </label>
                <select id="timeOfDay" name="timeOfDay" onChange={handleChange} value={formData.timeOfDay} required>
                    <option value="" disabled>Choose Timing...</option>
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

                <button type="submit">Book Venue</button>

            </form>

        </div>
    )
}

export default CreateBooking

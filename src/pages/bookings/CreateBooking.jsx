import React from 'react'
import { useState, useEffect } from 'react'
import { createBooking } from '../../services/bookingService';

function CreateBooking() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        date: "",
        timeOfDay: "",
        notes: ""
    });

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await createBooking(formData);
        navigate("/bookings");
    }

    return (
        <div>
            <h1>Create Booking</h1>

            <form onSubmit={handleSubmit}>

                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    name="date"
                    id="date"
                    onChange={handleChange}
                    value={formData.date}
                />

                <label htmlFor="timeOfDay">Time Of Day: </label>
                <select id="country" name="user_country" required>
                    <option value="" disabled selected>Choose Timing...</option>
                    <option value="Evening 7 to 12">Evening 7 to 12</option>
                    <option value="Morning 7 to 12">Morning 7 to 12</option>
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
    )
}

export default CreateBooking

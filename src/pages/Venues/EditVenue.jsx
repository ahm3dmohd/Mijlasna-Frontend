import React from 'react'
import { useState, useEffect } from 'react'
import {useNavigate, useParams} from 'react-router'
import { editVenue, getVenueById } from '../../services/venueService';
function EditVenue() {
    const navigate = useNavigate();
    const {id} = useParams()
    const [formData, setFormData] = useState({
            name: "",
            type: "",
            description: "",
            address: "",
            capacity: "",
            images: "",
            weekendPrice: "",
            weekDayPrice: "",
    });

  async function getVenue() {
    const res = await getVenueById(id);
    setFormData({
            name: res.name,
            type: res.type,
            description: res.description,
            address: res.address,
            capacity: res.capacity,
            images: res.images,
            weekendPrice: res.weekendPrice,
            weekDayPrice: res.weekDayPrice,
    });
  }

  useEffect(() => {
    getVenue();
  }, [id]);


    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await editVenue(id,formData);
        navigate(`/venues/${id}`);
    }

    return (
        <div>
            <h1>Edit Venue</h1>

            <form onSubmit={handleSubmit}>

                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleChange}
                    value={formData.name}
                    required
                />

                <label htmlFor="type">Type: </label>
                <select id="type" name="type" required>
                    <option value="" disabled selected>Choose Type...</option>
                    <option value="Mijlas">Mijlas</option>
                    <option value="Pool House">Pool House</option>
                    <option value="Hall">Hall</option>
                    <option value="Diwaniya">Diwaniya</option>
                </select>

                <label htmlFor="description">Description:</label>
                <input
                    type='text'
                    name="description"
                    id="description"
                    onChange={handleChange}
                    value={formData.description}
                ></input>

                <label htmlFor="address">Address:</label>
                <input
                    type="text"
                    name="address"
                    id="address"
                    onChange={handleChange}
                    value={formData.address}
                    required
                />
                <label htmlFor="capacity">Capacity:</label>
                <input
                    type="number"
                    name="capacity"
                    id="capacity"
                    onChange={handleChange}
                    value={formData.capacity}
                    required
                />
                <label htmlFor="weekDayPrice">Weekday Price:</label>
                <input
                    type="number"
                    name="weekDayPrice"
                    id="weekDayPrice"
                    onChange={handleChange}
                    value={formData.weekDayPrice}
                    required
                />
                <label htmlFor="weekendPrice">Weekend Price:</label>
                <input
                    type="number"
                    name="weekendPrice"
                    id="weekendPrice"
                    onChange={handleChange}
                    value={formData.weekendPrice}
                    required
                />

                <button type="submit">Create Venue</button>

            </form>

        </div>
    )
}

export default EditVenue

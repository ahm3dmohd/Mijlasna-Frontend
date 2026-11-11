import { useState } from 'react'
import { createVenue } from '../../services/venueService';
import { useNavigate } from 'react-router'

function CreateVenue() {
    const navigate = useNavigate();
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
    const [error, setError] = useState("");

    const [imageFile, setImageFile] = useState(null);

    function handleFileChange(e) {
        setImageFile(e.target.files[0]);
    }


    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const data = new FormData();
            for (const key in formData) {
                data.append(key, formData[key]);
            }

            // 2. Attach the image file if the user selected one
            // ('image' matches upload.single('image') on your backend route)
            if (imageFile) {
                data.append('image', imageFile);
            }

            // 3. Send everything in one single request
            await createVenue(data);
            navigate("/venues");
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to create venue.");
        }
    }

    return (
        <div>
            <h1>Create Venue</h1>
            <p className="error">{error}</p>

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
                <select id="type" name="type" onChange={handleChange} value={formData.type} required>
                    <option value="" disabled>Choose Type...</option>
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

                <label htmlFor="image">Venue Image:</label>
                <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    onChange={handleFileChange}
                />

                <button type="submit">Create Venue</button>

            </form>

        </div>
    )
}

export default CreateVenue

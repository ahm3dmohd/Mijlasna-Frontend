import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { editVenue, getVenueById } from '../../services/venueService'

function EditVenue({ user }) {
    const navigate = useNavigate()
    const { id } = useParams()
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        description: "",
        address: "",
        capacity: "",
        weekendPrice: "",
        weekDayPrice: "",
    })
    const [error, setError] = useState("")

    const [currentImage, setCurrentImage] = useState("")
    const [imageFile, setImageFile] = useState(null)
    const [preview, setPreview] = useState("")

    useEffect(() => {
        async function getVenue() {
            try {
                const res = await getVenueById(id)
                if (user.role !== "admin" && res.owner !== user._id) {
                    navigate(`/venues/${id}`, { replace: true })
                    return
                }
                setFormData({
                    name: res.name,
                    type: res.type,
                    description: res.description || "",
                    address: res.address,
                    capacity: res.capacity,
                    weekendPrice: res.weekendPrice,
                    weekDayPrice: res.weekDayPrice,
                })
                setCurrentImage(res.images || "")
            } catch (err) {
                setError(err?.response?.data?.message || "Failed to load venue.")
            }
        }
        getVenue()
    }, [id, user, navigate])

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    function handleFileChange(e) {
        const file = e.target.files[0] || null
        if (preview) URL.revokeObjectURL(preview)
        setImageFile(file)
        setPreview(file ? URL.createObjectURL(file) : "")
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const data = new FormData()
            for (const key in formData) {
                data.append(key, formData[key])
            }
            if (imageFile) {
                data.append('image', imageFile)
            }

            await editVenue(id, data)
            navigate(`/venues/${id}`)
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to update venue.")
        }
    }

    const shownImage = preview || currentImage

    return (
        <div>
            <h1>Edit Venue</h1>
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
                {shownImage && (
                    <img className="image-preview" src={shownImage} alt="Venue preview" />
                )}
                <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <p className="field-hint">Choose a new image to replace the current one, or leave it empty to keep it.</p>

                <button type="submit">Save Changes</button>

            </form>

        </div>
    )
}

export default EditVenue

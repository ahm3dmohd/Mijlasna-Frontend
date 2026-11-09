import React from 'react'
import { Link, useNavigate } from 'react-router'
import axios from 'axios';

function EditProfile() {
    const [formData, setFormData] = useState({
        username: user.username,
        email: user.email,
        phone: user.phone
    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACK_END_SERVER_URL}/me`, formData);
            navigate('/me')
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update profile.");

        }
    }

    return (
        <div>
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <button type="submit">Save Changes
                    </button>
                    <Link to="/me">
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default EditProfile

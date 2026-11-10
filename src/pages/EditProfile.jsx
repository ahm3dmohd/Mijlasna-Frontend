import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { getMe, updateMe } from '../services/userService';

function EditProfile() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: ''
    });
    const [error, setError] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        async function loadUser() {
            try {
                const user = await getMe()
                setFormData({
                    username: user.username,
                    email: user.email,
                    phone: user.phone
                })
            } catch (err) {
                setError(err?.response?.data?.message || "Failed to load profile.")
            }
        }
        loadUser()
    }, [])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateMe(formData);
            navigate('/me')
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to update profile.");

        }
    }

    return (
        <div>
            <h2>Edit Profile</h2>
            <p className='error'>{error}</p>
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

                <div className='actions'>
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

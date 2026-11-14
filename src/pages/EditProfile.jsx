import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { getMe, updateMe } from '../services/userService'
import PasswordFields from '../components/PasswordFields'

function EditProfile({ handleLogout }) {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        passwordConf: ''
    })
    const [error, setError] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        async function loadUser() {
            try {
                const user = await getMe()
                setFormData((current) => ({
                    ...current,
                    username: user.username,
                    email: user.email,
                    phone: user.phone
                }))
            } catch (err) {
                setError(err?.response?.data?.message || "Failed to load profile.")
            }
        }
        loadUser()
    }, [])

    const handleChange = (e) => {
        setError('')
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { password, passwordConf, ...profile } = formData

        if (password !== passwordConf) {
            setError('Passwords do not match.')
            return
        }

        try {
            await updateMe(password ? { ...profile, password } : profile)
            handleLogout()
            navigate('/sign-in')
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to update profile.")

        }
    }

    return (
        <div>
            <h1>Edit Profile</h1>
            <p className='error'>{error}</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='username'>Username:</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor='email'>Email:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor='phone'>Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                <PasswordFields
                    password={formData.password}
                    passwordConf={formData.passwordConf}
                    onChange={handleChange}
                    passwordLabel='New Password:'
                    confirmLabel='Confirm New Password:'
                />
                <p className='field-hint'>Leave the password empty to keep your current one.</p>

                <div className='actions'>
                    <button type="submit">Save Changes
                    </button>
                    <Link to="/me">
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default EditProfile

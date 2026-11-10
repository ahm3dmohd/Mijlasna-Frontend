import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router';
import { getMe, deleteMe } from '../services/userService';

function MyProfile({ handleLogout }) {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadUser() {
      try {
        const foundUser = await getMe()
        setUser(foundUser)
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load profile.")
      }
    }
    loadUser()
  }, [])

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;
    try {
      await deleteMe();
      handleLogout()
      navigate('/')
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete account.");
    }
  };

  if (error) return <p className='error'>{error}</p>
  if (!user) return <p>Loading...</p>

  return (
    <div>
      <h2>User Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>

      <div>
        <Link to="/me/edit">Edit</Link>
        <button onClick={handleDelete}>
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default MyProfile

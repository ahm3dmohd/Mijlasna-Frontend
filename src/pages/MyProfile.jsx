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
    <main>
      <h1>User Profile</h1>

      <div className='card details'>
        <div className='profile-head'>
          {/* the first letter of the username in a circle */}
          <div className='avatar' aria-hidden='true'>{user.username.charAt(0).toUpperCase()}</div>
          <div>
            <h2>{user.username}</h2>
            <span className='badge'>{user.role}</span>
          </div>
        </div>

        <dl className='detail-list'>
          <div>
            <dt>Username</dt>
            <dd>{user.username}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{user.email}</dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>{user.phone}</dd>
          </div>
        </dl>

        <div className='actions'>
          <Link to="/me/edit">Edit</Link>
          <button className='btn-danger' onClick={handleDelete}>
            Delete Account
          </button>
        </div>
      </div>
    </main>
  );
}

export default MyProfile

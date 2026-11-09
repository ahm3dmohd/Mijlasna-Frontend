import React from 'react'
import { Link, useNavigate } from 'react-router';
import axios from 'axios';

function MyProfile() {
    const navigate = useNavigate()
    const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BACK_END_SERVER_URL}/me`);
      navigate('/') 
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete account.");
    }
  };

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

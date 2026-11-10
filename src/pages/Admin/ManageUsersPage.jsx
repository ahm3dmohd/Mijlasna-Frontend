import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getAllUsers } from "../../services/userService";

function ManageUsersPage() {

    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await getAllUsers();
        setUsers(res);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load users.");
      }
    }
    getUsers();
  }, []);

  return (
    <div>

        <h1>Manage Users</h1>
        <p className="error">{error}</p>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ol>
          {users.map((oneUser) => (
            <li key={oneUser._id}>
              <h2>{oneUser.username}</h2>
              <p>Email: {oneUser.email}</p>
              <p>Role: {oneUser.role}</p>
              <Link to={`/users/${oneUser._id}`}>View Details</Link>
            </li>
          ))}
        </ol>
      )}

    </div>
  )
}

export default ManageUsersPage

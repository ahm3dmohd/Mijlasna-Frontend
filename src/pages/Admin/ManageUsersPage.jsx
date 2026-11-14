import { useEffect, useState } from "react"
import { Link } from "react-router"
import { getAllUsers } from "../../services/userService"

function ManageUsersPage() {

  const [users, setUsers] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await getAllUsers()
        setUsers(res)
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load users.")
      }
      setLoading(false)
    }
    getUsers()
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <main>

      <div className="page-head">
        <h1>Manage Users</h1>
      </div>
      <p className="error">{error}</p>

      {users.length === 0 && !error && <p>No users found.</p>}

      <div className="card-grid">
        {users.map((oneUser) => (
          <div key={oneUser._id} className="card">
            <div className="card-head">
              <h2>{oneUser.username}</h2>
              <span className="badge">{oneUser.role}</span>
            </div>
            <p><strong>Email:</strong> {oneUser.email}</p>
            <p><strong>Phone:</strong> {oneUser.phone || "N/A"}</p>
            <Link to={`/users/${oneUser._id}`} className="btn-secondary card-link">View Details</Link>
          </div>
        ))}
      </div>

    </main>
  )
}

export default ManageUsersPage

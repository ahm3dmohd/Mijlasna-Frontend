import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { getUserById, deleteUser } from "../../services/userService";


function UserDetailsPage() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getUser() {
      try {
        const res = await getUserById(id);
        setUser(res);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load user.");
      }
    }
    getUser();
  }, [id]);

  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this user? Their venues, bookings and reviews are deleted too.")) return;
    try {
      await deleteUser(id);
      navigate("/users");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete user.");
    }
  }

  if (error && !user) {
    return <p className="error">{error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <main>

      <h1>User Details</h1>
      <p className="error">{error}</p>

      <div className="card details">
        <div className="profile-head">
          {/* the first letter of the username in a circle */}
          <div className="avatar" aria-hidden="true">{user.username.charAt(0).toUpperCase()}</div>
          <div>
            <h2>{user.username}</h2>
            <span className="badge">{user.role}</span>
          </div>
        </div>

        <dl className="detail-list">
          <div>
            <dt>Email</dt>
            <dd>{user.email}</dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>{user.phone || "N/A"}</dd>
          </div>
          <div>
            <dt>Created</dt>
            <dd>{new Date(user.createdAt).toLocaleString()}</dd>
          </div>
          <div>
            <dt>Updated</dt>
            <dd>{new Date(user.updatedAt).toLocaleString()}</dd>
          </div>
        </dl>

        <div className="actions">
          <Link to={`/users/${id}/edit`}>Edit</Link>
          <button className="btn-danger" onClick={handleDelete}>Delete</button>
          <Link to="/users">Back</Link>
        </div>
      </div>

    </main>
  )
}

export default UserDetailsPage

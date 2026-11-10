import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
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
    if (!window.confirm("Are you sure you want to delete this user?")) return;
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
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>

        <h1>User Details</h1>
        <p className="error">{error}</p>

      <h2>Username: {user.username}</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone || "N/A"}</p>
      <p>Role: {user.role}</p>
      <p>Created At: {new Date(user.createdAt).toLocaleString()}</p>
      <p>Updated At: {new Date(user.updatedAt).toLocaleString()}</p>

      <div className="actions">
        <button onClick={() => navigate(`/users/${id}/edit`)}>Edit User</button>
        <button className="btn-danger" onClick={handleDelete}>Delete User</button>
      </div>

    </div>
  )
}

export default UserDetailsPage

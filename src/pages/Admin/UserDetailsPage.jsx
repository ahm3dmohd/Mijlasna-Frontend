import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, deleteUser } from "../../services/userService";


function UserDetailsPage() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  async function getUser() {
    try {
      const res = await getUserById(id);
      setUser(res);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUser();
  }, [id]);

  async function handleDelete() {
    try {
      await deleteUser(id);
      navigate("/users");
    } catch (err) {
      console.log(err);
    }
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

      <h2>Username: {user.username}</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone || "N/A"}</p>
      <p>Role: {user.role}</p>
      <p>Created At: {new Date(user.createdAt).toLocaleString()}</p>
      <p>Updated At: {new Date(user.updatedAt).toLocaleString()}</p>

      <button onClick={() => navigate(`/users/${id}/edit`)}>Edit User</button>
      <button onClick={handleDelete}>Delete User</button>

    </div>
  )
}

export default UserDetailsPage
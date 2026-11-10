import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getUserById, updateUser } from "../../services/userService";


function EditUserPage() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    role: "customer"
  });
  const [error, setError] = useState("");

  useEffect(() => {
    async function getUser() {
      try {
        const res = await getUserById(id);
        setFormData({
          username: res.username || "",
          email: res.email || "",
          phone: res.phone || "",
          role: res.role || "customer"
        });
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load user.");
      }
    }
    getUser();
  }, [id]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await updateUser(id, formData);
      navigate("/users/" + res._id);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to update user.");
    }
  }


  return (
    <div>

    <h1>Edit User</h1>
    <p className="error">{error}</p>

      <form onSubmit={handleSubmit}>

        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
          value={formData.username}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          value={formData.email}
        />

        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          name="phone"
          id="phone"
          onChange={handleChange}
          value={formData.phone}
        />

        <label htmlFor="role">Role:</label>
        <select
          name="role"
          id="role"
          onChange={handleChange}
          value={formData.role}
        >
          <option value="customer">Customer</option>
          <option value="owner">Owner</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Update User</button>

      </form>

    </div>
  )
}

export default EditUserPage

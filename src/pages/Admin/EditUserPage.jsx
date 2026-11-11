import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { getUserById, updateUser } from "../../services/userService";
import PasswordFields from "../../components/PasswordFields";


function EditUserPage({ user, handleLogout }) {

  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    role: "customer",
    password: "",
    passwordConf: ""
  });
  const [error, setError] = useState("");

  useEffect(() => {
    async function getUser() {
      try {
        const res = await getUserById(id);
        setFormData((current) => ({
          ...current,
          username: res.username || "",
          email: res.email || "",
          phone: res.phone || "",
          role: res.role || "customer"
        }));
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load user.");
      }
    }
    getUser();
  }, [id]);

  function handleChange(e) {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { password, passwordConf, ...profile } = formData;

    if (password !== passwordConf) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // the password is only sent when a new one was typed
      const res = await updateUser(id, password ? { ...profile, password } : profile);
      // an admin who changes their own account has to sign in again
      if (res._id === user._id) {
        handleLogout();
        navigate("/sign-in");
      } else {
        navigate("/users/" + res._id);
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to update user.");
    }
  }


  return (
    <main>

      <h1>Edit User</h1>
      <p className="error">{error}</p>

      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={handleChange}
            value={formData.username}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            value={formData.email}
            required
          />
        </div>

        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            name="phone"
            id="phone"
            onChange={handleChange}
            value={formData.phone}
          />
        </div>

        <div>
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
        </div>

        <PasswordFields
          password={formData.password}
          passwordConf={formData.passwordConf}
          onChange={handleChange}
          passwordLabel="New Password:"
          confirmLabel="Confirm New Password:"
        />
        <p className="field-hint">Leave the password empty to keep the current one.</p>

        <div className="actions">
          <button type="submit">Update User</button>
          <Link to={`/users/${id}`}>Cancel</Link>
        </div>

      </form>

    </main>
  )
}

export default EditUserPage

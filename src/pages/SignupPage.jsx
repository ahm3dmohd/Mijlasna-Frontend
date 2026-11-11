import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { signUp } from "../services/authService";
import PasswordFields from "../components/PasswordFields";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    passwordConf: "",
    role: "customer",
  });
  const [ submitting, setSubmitting ] = useState(false)

  const { username, email, phone, password, passwordConf, role } = formData;

  function handleChange(event){
    setError("");
    setFormData({ ...formData, [event.target.name]: event.target.value });

  }


  async function handleSubmit(event){
    event.preventDefault();
    if (password !== passwordConf) {
      setError("Passwords do not match.");
      return;
    }
    try {
      setSubmitting(true)
      await signUp(formData);
      navigate('/sign-in')
    } catch (err) {
      setError(err?.response?.data?.message || "Sign up failed. Please try again.");
      setSubmitting(false)
    }
  }

  function isFormInvalid(){
    return !(username && email && phone && password && password === passwordConf);
  };

  return (
    <main className="auth">
      <h1>Sign Up</h1>
      <p className="error">{error}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            name="username"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            name="email"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            name="phone"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="role">I am a:</label>
          <select id="role" value={role} name="role" onChange={handleChange}>
            <option value="customer">Customer</option>
            <option value="owner">Venue owner</option>
          </select>
        </div>
        <PasswordFields
          password={password}
          passwordConf={passwordConf}
          onChange={handleChange}
          required
        />
        <div className="actions">
          <button disabled={isFormInvalid() || submitting}>{submitting ? 'Signing up...' : 'Sign Up'}</button>
          <button type="button" className="btn-secondary" onClick={() => navigate("/")}>Cancel</button>
        </div>
      </form>
      <p className="auth-note">Already have an account? <Link to="/sign-in">Sign in</Link></p>
    </main>
  );
}
export default Signup;

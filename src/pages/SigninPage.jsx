// src/components/SignInForm/SignInForm.jsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { signIn } from '../services/authService';


const SignInForm = ({ setUser }) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  function handleChange(event){
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event){
    event.preventDefault();
    try {
      const signedInUser = await signIn(formData);

      setUser(signedInUser);
      navigate('/dashboard');
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to sign in. Please try again.');
    }
  };

  return (
    <main className='auth'>
      <h1>Sign In</h1>
      <p className='error'>{error}</p>
      <form autoComplete='off' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            autoComplete='off'
            id='username'
            value={formData.username}
            name='username'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            autoComplete='off'
            id='password'
            value={formData.password}
            name='password'
            onChange={handleChange}
            required
          />
        </div>
        <div className='actions'>
          <button>Sign In</button>
          <button type='button' className='btn-secondary' onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
      <p className='auth-note'>No account yet? <Link to='/sign-up'>Sign up</Link></p>
    </main>
  );
};

export default SignInForm;

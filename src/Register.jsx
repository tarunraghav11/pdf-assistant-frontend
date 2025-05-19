import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://pdf-backend-new-hdcdgxh4bpe6e9fu.centralindia-01.azurewebsites.net/api/auth/register', {
        name,
        email,
        password,
      });

      // Optional: store token if needed
      localStorage.setItem('token', response.data.token);

      // Navigate to login or dashboard
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      alert(error.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl mb-4">Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
          className="border p-2"
          required
        />
        <br />
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          className="border p-2"
          required
        />
        <br />
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          className="border p-2"
          required
        />
        <br />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Register
        </button>
      </form>
      <p className="mt-4">
        Already have an account? <Link to="/login" className="text-blue-500 underline">Login</Link>
      </p>
    </div>
  );
}

export default Register;

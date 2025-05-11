import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });

      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed. Check credentials.');
      console.error('Login error:', err.response?.data || err.message);
    }
  };

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="border p-2" />
        <br />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" className="border p-2" />
        <br />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Login</button>
      </form>
      <p className="mt-4">
        Don't have an account? <Link to="/register" className="text-blue-500 underline">Register</Link>
      </p>
    </div>
  );
}

export default Login;

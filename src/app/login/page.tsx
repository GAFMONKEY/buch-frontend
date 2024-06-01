'use client'
import { useState } from 'react';
import login from '../lib/login';

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');

    console.log('username', username, 'password', password);

    const ok = await login(username, password);
    
      if (ok) {
        
      } else {
        setError('Invalid credentials');
      }
  };



  return (
  <div>
    <h1>Login</h1>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Login</button>
    </form>
  </div>
  );
}
  
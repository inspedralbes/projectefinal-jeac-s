import React, { useState } from 'react';
import { FormControl } from 'react-bootstrap';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [psswd, setPsswd] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',          
        },
        body: JSON.stringify({ username, psswd }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      setError(error);
      
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error.message}</p>}
      
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="username"
          id="username"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      
      <div>
        <label htmlFor="psswd">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={psswd}
          onChange={(event) => setPsswd(event.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
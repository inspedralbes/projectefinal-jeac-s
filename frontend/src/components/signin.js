import { Form, Button, Container } from 'react-bootstrap';
import React, { useState } from 'react';

function Signin() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [psswd, setPsswd] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
        const response = await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',          
            },
            body: JSON.stringify({ name, username, email, psswd }),
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
    <div>
      <Container>
        <Form onSubmit={handleSubmit}>
            {error && <p>{error.message}</p>}
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" value={name} onChange={(event) => setName(event.target.value)}/>
          </Form.Group>

          <Form.Group controlId="formBasicName">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" value={username} onChange={(event) => setUsername(event.target.value)}/>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(event) => setEmail(event.target.value)}/>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={psswd} onChange={(event) => setPsswd(event.target.value)}/>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  )
}

export default Signin;
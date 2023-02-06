import {Card, Row, Col, Form, Button, Container } from 'react-bootstrap';
import React, { useState } from 'react';

function Signin() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/setPlayerData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, username, email, password }),
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
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="px-4 rounded bg-dark">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase text-light ">
                    Sign In
                  </h2>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      {error && <p>{error.message}</p>}
                      <Form.Group controlId="formBasicName">
                        <Form.Label className='text-light'>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" value={name} onChange={(event) => setName(event.target.value)} required />
                      </Form.Group>
                      <br></br>

                      <Form.Group controlId="formBasicName">
                        <Form.Label className='text-light'>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" value={username} onChange={(event) => setUsername(event.target.value)} required />
                      </Form.Group>
                      <br></br>

                      <Form.Group controlId="formBasicEmail">
                        <Form.Label className='text-light'>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(event) => setEmail(event.target.value)} required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"></Form.Control>
                      </Form.Group><br></br>

                      <Form.Group controlId="formBasicPassword">
                        <Form.Label className='text-light'>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" />
                      </Form.Group><br></br>

                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                    </Form>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Signin;
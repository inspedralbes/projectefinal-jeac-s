import React, { useState } from 'react';
import { Card, Row, Col, Form, Button, Container } from 'react-bootstrap';

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
    <div>
      <Container>
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="px-4 rounded bg-dark">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase text-light ">
                    Log In
                  </h2>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      {error && <p>{error.message}</p>}

                      <Form.Group controlId="formBasicName">
                        <Form.Label className='text-light'>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" value={username}
                          onChange={(event) => setUsername(event.target.value)} required />
                      </Form.Group>
                      <br></br>

                      <Form.Group controlId="formBasicPassword">
                        <Form.Label className='text-light'>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={psswd}
                          onChange={(event) => setPsswd(event.target.value)} required />
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

  );
}

export default LoginForm;
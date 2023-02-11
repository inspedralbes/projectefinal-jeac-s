import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from './store';
import { Card, Row, Col, Form, Button, Container, NavLink } from 'react-bootstrap';
import { saveData } from './actions';
import { useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [psswd, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const data = useSelector((state) => state.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, psswd }),
      });

      const data = await response.json();

      if (data.isLoggedIn) {
        dispatch(actions.login());
        dispatch(saveData(data[0]));
        navigate("/")

      } else {
        dispatch(actions.logout());
      }
      setLoading(false)
    } catch (error) {
      console.error(error);
      setLoading(false)
    }
  };

  return (
    <div>
      {isLoggedIn ? <h2>You are already logged in</h2> :
        <Container>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={8} lg={6} xs={12}>
              <br></br>
              <Card className="px-4 rounded bg-dark">
                <Card.Body>
                  <div className="mb-3 mt-md-4">
                    <h2 className="fw-bold mb-2 text-center text-uppercase text-light ">
                      Log In
                    </h2>
                    <div className="mb-3">
                      <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicName">
                          <Form.Label className='text-light'>Username</Form.Label>
                          <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </Form.Group>
                        <br></br>

                        <Form.Group controlId="formBasicPassword">
                          <Form.Label className='text-light'>Password</Form.Label>
                          <Form.Control type="password" placeholder="Password" value={psswd} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group><br></br>

                        <Button variant="primary" type="submit" disabled={isLoading}>
                          {isLoading ? (
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                          ) : (
                            'Login'
                          )}
                        </Button>
                      </Form>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      }
    </div>
  );
};

export default LoginForm;

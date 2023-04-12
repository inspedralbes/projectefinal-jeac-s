import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { store, actions } from './store';
import { Card, Row, Col, Form, Button, Container, NavLink } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://jeacsgames.alumnes.inspedralbes.cat/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.isLoggedIn) {
        dispatch(actions.login());
        store.dispatch(actions.saveData(data[1]));
        localStorage.setItem('access_token', data[0]);
        navigate("/")

      } 
      
      setLoading(false)
    } catch (error) {
      console.error(error);
      setLoading(false)
    }
  };

  return (
    <div>
      {isLoggedIn ? <p className="ranking_font_size">You are already logged in</p> :
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
                        <Form.Group controlId="formBasicEmail">
                          <Form.Label className='text-light'>Email address</Form.Label>
                          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(event) => setEmail(event.target.value)}></Form.Control>
                        </Form.Group><br></br>

                        <Form.Group controlId="formBasicPassword">
                          <Form.Label className='text-light'>Password</Form.Label>
                          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
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

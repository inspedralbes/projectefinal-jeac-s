import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from './store';
import { Card, Row, Col, Form, Button, Container, NavLink } from 'react-bootstrap';
import { saveData } from './actions';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [psswd, setPassword] = useState('');
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const data = useSelector((state) => state.data);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

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
            } else {
                dispatch(actions.logout());
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
      <Container>
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <br></br>
            <Card className="px-4 rounded bg-dark">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase text-light ">
                    Sign In
                  </h2>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group controlId="formBasicName">
                        <Form.Label className='text-light'>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                      </Form.Group>
                      <br></br>

                      <Form.Group controlId="formBasicPassword">
                        <Form.Label className='text-light'>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"  value={psswd} onChange={(e) => setPassword(e.target.value)} />
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
};



export default LoginForm;

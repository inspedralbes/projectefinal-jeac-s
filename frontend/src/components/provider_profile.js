import { useSelector } from 'react-redux';
import { store, actions } from './store'; // import the Redux store
import React, { useState } from 'react';
import { Card, Row, Col, Form, Button, Container, NavLink } from 'react-bootstrap';


const UserInfo = () => {
  const data = useSelector(state => state.data);
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const token = localStorage.getItem('access_token');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const changeName = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/changeName', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });
      const data = await response.json();
      store.dispatch(actions.saveData(data));
    } catch (error) {
      console.error(error);
    }
  };
  const changeEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/changeEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      store.dispatch(actions.saveData(data));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      {isLoggedIn ?
        <div>
          <h1>User Information</h1>
          <h2>Name: {data.data.name}</h2>
          <h2>Email: {data.data.email}</h2>
          <h2>Score: {data.data.totalScore}</h2>
          <Container>
            <Form onSubmit={changeName}>
              <Form.Group controlId="formBasicName"><br></br>
                <Form.Control type="name" placeholder="Enter name" value={name} onChange={(event) => setName(event.target.value)}></Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit" >Change Name
              </Button>
            </Form>
            <Form onSubmit={changeEmail}><br></br>
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(event) => setEmail(event.target.value)}></Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit" >Change Email
              </Button>
            </Form>
          </Container>
        </div> :
        <h2>You need to be logged in</h2>
      }
    </div>
  );
};

export default UserInfo;

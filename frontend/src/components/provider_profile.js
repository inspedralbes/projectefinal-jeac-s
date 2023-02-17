import { useSelector, useDispatch } from 'react-redux';
import { store, actions } from './store'; // import the Redux store
import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Button, Container, NavLink } from 'react-bootstrap';

const UserInfo = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const token = localStorage.getItem('access_token');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const userInfo = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [showSuccessMessagePassword, setShowSuccessMessagePassword] = useState(false);
  const [showSuccessMessageName, setShowSuccessMessageName] = useState(false);
  useEffect(() => {
    async function fetchUsers() {
      if (isLoggedIn) {
        try {
          const response = await fetch('http://localhost:8000/api/showProfile', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = await response.json();
          dispatch(actions.saveData(data));

        } catch (error) {
          console.error(error);
        }
      }
    }
    fetchUsers();
  }, []);

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
      dispatch(actions.saveData(data));
      setShowSuccessMessageName(true);

    } catch (error) {
      console.error(error);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/changePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      dispatch(actions.saveData(data));
      setShowSuccessMessagePassword(true);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>
      {isLoggedIn ?
        <div>
          <p className="ranking_font_size">User Information</p>
          <p className="ranking_font_size">Name: {userInfo.name}</p>
          <p className="ranking_font_size">Email: {userInfo.email}</p>
          <p className="ranking_font_size">Score: {userInfo.totalScore}</p>

          <Container>
            <Form onSubmit={changeName}>
              <Form.Group controlId="formBasicName"><br></br>
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" placeholder="Enter name" value={name} onChange={(event) => setName(event.target.value)}></Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit" >Change Name
              </Button>
              <div className="texto_verde">{showSuccessMessageName && <p>Name change successful!</p>}</div>
            </Form>
            <Form onSubmit={changePassword}><br></br>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password (Must have 1 capital letter, 1 lowercase letter, 1 number and a minimum length of 8)</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" />
              </Form.Group>
              <Button variant="primary" type="submit" >Change Password
              </Button>
              <div className="texto_verde">{showSuccessMessagePassword && <p>Password change successful!</p>}</div>
            </Form>
          </Container>
        </div> :
        <p className="ranking_font_size">You need to be logged in</p>
      }
    </div>
  );
};

export default UserInfo;

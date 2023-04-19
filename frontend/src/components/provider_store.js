import { useSelector, useDispatch } from 'react-redux';
import { store, actions } from './store'; // import the Redux store
import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Button, Container, NavLink, Image } from 'react-bootstrap';
import routes from '../index.js';

const Tienda = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const token = localStorage.getItem('access_token');
  const [storeItems, setStoreItems] = useState([]);

  useEffect(() => {
    async function fetchStoreItems() {
      if (isLoggedIn) {
        try {
          const response = await fetch(routes.fetchLaravel + `/api/getStoreItems`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          const storeItems = await response.json();
          console.log(storeItems);
          setStoreItems(storeItems);
        } catch (error) {
          console.error(error);
        }
      }
    }
    fetchStoreItems();
  }, []);

  return (
    <div>
      {isLoggedIn ?      
        <Container>
          {storeItems.map((item, id) => (
            <Card key={id}>
              <Card.Body>
                <Card.Title>Item: {item.name}</Card.Title>
                <Image src={item.image_url} style={{ width: '150px', height: '150px' }} />
                <Card.Text>Description: {item.description}</Card.Text>
                <Card.Text>Price: {item.price} Jeacstars</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Container> :
        <p className="ranking_font_size">You need to be logged in</p>
      }
    </div>
  );
};

export default Tienda;

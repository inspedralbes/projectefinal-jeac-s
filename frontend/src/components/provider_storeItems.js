import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
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

  async function prova() {
    if (isLoggedIn) {
      try {
        const response = await fetch(routes.fetchLaravel + `/api/showProfile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div>
      {isLoggedIn ?
        <div>
          {storeItems.map((item, id) => (
            <div key={id}>
              <h2>Item: {item.name}</h2>
              <img src={item.image_url} style={{ width: '150px', height: '150px' }} />
              <p>Description: {item.description}</p>
              <p>Price: {item.price} Jeacstars</p>
              <button onClick={prova}>Buy</button>
            </div>
          ))}
        </div> :
        <p className="ranking_font_size">You need to be logged in</p>
      }
    </div>
  );
};

export default Tienda;

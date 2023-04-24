import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import routes from '../index.js';

const Tienda = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const token = localStorage.getItem('access_token');
  const [storeItems, setStoreItems] = useState([]);
  const [boughtItems, setBoughtItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const userInfo = useSelector((state) => state.data);

  useEffect(() => {
    async function fetchStoreItems() {
      if (isLoggedIn) {
        try {
          const response = await fetch(`${routes.fetchLaravel}/api/getStoreItems`, {
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

    async function fetchBoughtItems() {
      if (isLoggedIn) {
        try {
          const response = await fetch(`${routes.fetchLaravel}/api/getBoughtItems`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          const boughtItems = await response.json();
          console.log(boughtItems);
          setBoughtItems(boughtItems);
          setIsLoading(true)
        } catch (error) {
          console.error(error);
        }
      }
    }
    fetchBoughtItems();
  }, []);

  async function buyItem(userId, itemId) {
    if (isLoggedIn) {
      try {
        const a = await fetch(`${routes.fetchLaravel}/api/buyItems`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ userId, itemId }),
        });
        const b = await a.json();
        console.log(b);

      } catch (error) {
        console.error(error);
      }
    }
  }

  const itemsToBuy = storeItems.filter(item => {
    return !boughtItems.some(boughtItem => boughtItem.userId === userInfo.id && boughtItem.itemId === item.id);
  });

  return (
    <div>
      {isLoggedIn ?
        <div>
          {isLoading ?
            <div>
              {
                itemsToBuy.map((item, id) => (
                  <div key={id}>
                    <h2>Item: {item.name}</h2>
                    <img src={item.image_url} style={{ width: '150px', height: '150px' }} />
                    <p>Description: {item.description}</p>
                    <p class="inline">Price: {item.price}</p>
                    <img class="inline w-10 h-10" src="JeacstarNF.png" alt="JeacstarNF"></img><br></br>
                    <button id={item.id} onClick={() => buyItem(userInfo.id, item.id)}>Buy</button>
                  </div>
                ))
              }
            </div> :
            <p>Loading...</p>
          }
        </div> :
        <p className="ranking_font_size">You need to be logged in</p>
      }
    </div>
  );
};

export default Tienda;

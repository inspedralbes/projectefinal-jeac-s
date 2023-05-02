import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import routes from '../index.js';
import { useTranslation } from 'react-i18next';

const Tienda = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const token = localStorage.getItem('access_token');
  const [storeItems, setStoreItems] = useState([]);
  const [boughtItems, setBoughtItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userInfo = useSelector((state) => state.data);
  const { t } = useTranslation();

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
          const response = await fetch(routes.fetchLaravel + `/api/getBoughtItems`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          const boughtItems = await response.json();
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
        const a = await fetch(routes.fetchLaravel + `/api/buyItems`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ userId, itemId }),
        });
      } catch (error) {
        console.error(error);
      }
      try {
        const response = await fetch(routes.fetchLaravel + `/api/getBoughtItems`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const boughtItems = await response.json();
        setBoughtItems(boughtItems);
      } catch (error) {
        console.error(error);
      }
    }
  }

  const itemsToBuy = storeItems.filter(item => {
    return !boughtItems.some(boughtItem => boughtItem.userId === userInfo.id && boughtItem.itemId === item.id);
  });

  return (
    <div class="flex h-screen justify-center items-center min-h-screen bg-image-all bg-cover bg-no-repeat bg-center bg-fixed">
      <div class="container h-full w-2/4 p-10">
        <div class="block rounded-lg bg-gray-800 shadow-lg dark:bg-neutral-800">
          <div class="p-4">
            <div class="md:m-6 md:p-12">
              <div class="text-white ">
                {isLoggedIn ?
                  <div>
                    {isLoading ?
                      <div>
                        {itemsToBuy.length > 0 ?
                          <div >
                            <h2 class="text-center text-xl">{t('itemsTitle')}</h2>
                            <br></br>
                            {
                              itemsToBuy.map((item, id) => (
                                <div class="flex" key={id}>
                                  <div class = "flex-initial w-1/3 text-center">
                                    <h2>{t('itemsItem')}: {item.name}</h2>
                                    <img src={item.image_url} class = "mx-auto" />
                                    <p>{t('itemsDesc')}: {item.description}</p>
                                    <p class="inline">{t('itemsPrice')}: {item.price}</p>
                                    <img class="inline w-10 h-10" src="JeacstarNF.png" alt="JeacstarNF"></img><br></br>
                                    <button id={item.id} onClick={() => buyItem(userInfo.id, item.id)}>
                                      {t('storeBuyItem')}
                                    </button>
                                  </div>
                                </div>
                              ))
                            }
                          </div> :
                          <p>
                            {t('storeNoItemsLeft')}
                          </p>
                        }
                      </div> :
                      <p>
                        {t('loading')}
                      </p>
                    }
                  </div> :
                  <p>
                    {t('mensajeErrorNotLoggedInStore')}
                  </p>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tienda;

import { useSelector, useDispatch } from 'react-redux';
import { store, actions } from './store'; // import the Redux store
import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Button, Container } from 'react-bootstrap';
import routes from '../index.js';
import { NavLink } from 'react-router-dom';

const UserInfo = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const token = localStorage.getItem('access_token');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [storeItems, setStoreItems] = useState([]);
  const [boughtItems, setBoughtItems] = useState([]);
  const userInfo = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [showSuccessMessagePassword, setShowSuccessMessagePassword] = useState(false);
  const [showSuccessMessageName, setShowSuccessMessageName] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      if (isLoggedIn) {
        try {
          const response = await fetch(routes.fetchLaravel + '/api/showProfile', {
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
          console.log(boughtItems);
          setBoughtItems(boughtItems);
        } catch (error) {
          console.error(error);
        }
      }
    }
    fetchBoughtItems();
  }, []);

  const changeName = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(routes.fetchLaravel + '/api/changeName', {
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

  let changeViewName = "userinfo";

  function changeView(name) {
    changeViewName = name;
    console.log(name);
  }

  async function sellItem(userId, itemId) {
    if (isLoggedIn) {
      try {
        const a = await fetch(routes.fetchLaravel + `/api/sellItems`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ userId, itemId }),
        });
        const b = await a.json();
      } catch (error) {
        console.error(error);
      }
    }
  }

  // async function setAvatar(userId, itemId) {
  //   if (isLoggedIn) {
  //     try {
  //       const a = await fetch(routes.fetchLaravel + `/api/setAvatar`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${token}`,
  //         },
  //         body: JSON.stringify({ userId, itemId }),
  //       });
  //       const b = await a.json();
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // }

  const purchasedItems = storeItems.filter(item => {
    return boughtItems.some(boughtItem => boughtItem.userId === userInfo.id && boughtItem.itemId === item.id);
  });

  return (
    <div class="flex h-screen justify-center items-center bg-violet-400">
      {isLoggedIn ?
        <div>
          <nav class="backdrop-filter backdrop-blur-l bg-opacity-30 border-b border-gray-200">
            <div class="flex space-x-4">

              <a onClick={() => changeView("userinfo")} class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">User Info</a>

              <a onClick={() => changeView("historial")} class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Historial</a>

              <a onClick={() => changeView("coleccion")} class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Coleccionables</a>

              <a onClick={() => changeView("logros")} class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Logros</a>
            </div>
          </nav>
          <br></br>
          <div className="mb-3 mt-md-4">
          <div style={{ display: 'flex'}}>
            {
              purchasedItems.map((item, id) => (
                <div key={id} style={{ marginRight: '10px' }}>
                  <h2>Item: {item.name}</h2>
                  <img src={item.image_url} style={{ width: '150px', height: '150px' }} />
                  <p>Description: {item.description}</p>
                  <p>Price: {item.price * 0.5} <img class = "w-10 h-10" src = "JeacstarNF.png"></img></p> 
                  <button id={item.id} onClick={() => sellItem(userInfo.id, item.id)}>Sell Item</button><br></br>
                  {/* <button id={item.id} onClick={() => setAvatar(userInfo.id, item.id)}>Set as Avatar</button> */}

                </div>
              ))
            }
            </div>
            <h2 className="fw-bold mb-2 text-center text-uppercase text-light ">
              User Info
            </h2>
            <div className="mb-3 mt-md-4">
              <div class="text-center">
                <p className="ranking_font_size">Name: <h4>{userInfo.name}</h4></p>
                <p className="ranking_font_size">Email: <h4>{userInfo.email}</h4></p>
                <p className="ranking_font_size">Score: <h4>{userInfo.totalScore}</h4></p>
                <p className="ranking_font_size">Jeacstars: <h4>{userInfo.jeacstars}</h4><img class = "w-10 h-10" src = "JeacstarNF.png"></img></p>
              </div>

              <div>
                <Form onSubmit={changeName}>
                  <Form.Group controlId="formBasicName"><br></br>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter name" value={name} onChange={(event) => setName(event.target.value)}></Form.Control>
                  </Form.Group>
                  <Button variant="primary" type="submit" >Change Name
                  </Button>
                  <div className="texto_verde">{showSuccessMessageName && <p>Name change successful!</p>}</div>
                </Form>
              </div>

              <div>
                <Form onSubmit={changePassword}><br></br>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password (Must have 1 capital letter, 1 lowercase letter, 1 number and a minimum length of 8)</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" />
                  </Form.Group>
                  <Button variant="primary" type="submit" >Change Password
                  </Button>
                  <div className="texto_verde">{showSuccessMessagePassword && <p>Password change successful!</p>}</div>
                </Form>
              </div>
            </div>
          </div>
        </div>
        :
        <div >
          <div class="p-10 opacity-90 text-center bg-purple-300 rounded-lg">
            <p class="mb-6 text-lg font-normal text-fuchsia-950 lg:text-2xl sm:px-16 xl:px-48 dark:text-gray-400"> No estas registrado :( </p>
            <p class="mb-6 text-lg font-normal text-fuchsia-950 lg:text-2xl sm:px-16 xl:px-48 dark:text-gray-400">Si quieres customizar tu perfil INICIA SESION o REGISTRATE!</p>
            <NavLink to="/login">
              <a href="#" class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-emerald-700 rounded-lg hover:bg-violet-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                Inicia Sesion!
              </a>
            </NavLink>
            <a> </a>
            <NavLink to="/signin">
              <a href="#" class=" inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-emerald-700 rounded-lg hover:bg-violet-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                Registrate!
              </a>
            </NavLink>
          </div>
        </div>
      }
    </div>
  );
};

export default UserInfo;

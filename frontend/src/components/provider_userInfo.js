import { useSelector, useDispatch } from 'react-redux';
import { store, actions } from './store'; // import the Redux store
import React, { useState, useEffect } from 'react';
import routes from '../index.js';
import { NavLink } from 'react-router-dom';
import classNames from "classnames";

const UserInfo = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const token = localStorage.getItem('access_token');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [storeItems, setStoreItems] = useState([]);
  const [boughtItems, setBoughtItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
          setStoreItems(storeItems);
          dispatch(actions.saveStoreItems(storeItems));
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
          dispatch(actions.saveBoughtItems(boughtItems));
          setIsLoading(true);
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
        dispatch(actions.saveBoughtItems(boughtItems));
      } catch (error) {
        console.error(error);

      }
    }
  }

  async function setAvatar(userId, itemId) {
    if (isLoggedIn) {
      try {
        const a = await fetch(routes.fetchLaravel + `/api/setAvatar`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ userId, itemId }),
        });
        const response = await fetch(routes.fetchLaravel + `/api/getBoughtItems`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const boughtItems = await response.json();
        setBoughtItems(boughtItems);
        dispatch(actions.saveBoughtItems(boughtItems));
      } catch (error) {
        console.error(error);
      }
    }
  }

  const purchasedItems = storeItems.filter(item => {
    return boughtItems.some(boughtItem => boughtItem.userId === userInfo.id && boughtItem.itemId === item.id);
  });


  const [activeTab, setActiveTab] = useState("tab1"); // initialize active tab to tab1

  const handleTabClick = (tab) => {
    setActiveTab(tab); // update active tab based on the tab clicked
  };

  return (
    <div class="overflow-auto bg-image-all bg-cover bg-no-repeat bg-center bg-fixed flex h-screen justify-center items-center ">
      {isLoggedIn ?
        <div class=" container h-full w-3/4 p-10">
          <div class="block rounded-lg bg-gray-800 shadow-lg dark:bg-neutral-800">
            <div class="p-4">
              <div class="md:m-6 md:p-12">
                <div class="text-center">
                  <nav class="backdrop-filter backdrop-blur-l bg-opacity-30 border-b border-gray-200">
                    <div class="flex space-x-4">

                      <li className= {`w-1/4 list-none ${activeTab === "tab1" ? "active" : ""}`}>
                        <a onClick={() => handleTabClick("tab1")} class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">User Info</a>
                      </li>

                      <li className= {`w-1/4 list-none ${activeTab === "tab2" ? "active" : ""}`}>
                        <a onClick={() => handleTabClick("tab2")} class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Historial</a>
                      </li>

                      <li className= {`w-1/4 list-none ${activeTab === "tab3" ? "active" : ""}`}>
                        <a onClick={() => handleTabClick("tab3")} class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Coleccionables</a>
                      </li>

                      <li className= {`w-1/4 list-none ${activeTab === "tab4" ? "active" : ""}`}>
                        <a onClick={() => handleTabClick("tab4")} class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Logros</a>
                      </li>
                    </div>
                  </nav>
                  <br></br>

                  {activeTab === "tab1" &&
                    <div>
                      <h2 class="text-white">
                        User Info
                      </h2>
                      
                      <img></img>
                      <div className="mb-3 mt-md-4">
                        <div class="text-center text-white">
                          <p className="ranking_font_size">Name: <h4>{userInfo.name}</h4></p>
                          <p className="ranking_font_size">Email: <h4>{userInfo.email}</h4></p>
                          <p className="ranking_font_size">Score: <h4>{userInfo.totalScore}</h4></p>
                          <p className="ranking_font_size">Jeacstars: <h4>{userInfo.jeacstars}</h4><img class="w-10 h-10" src="JeacstarNF.png"></img></p>
                        </div>

                        <form onSubmit={changeName}>
                          <div class="border-2 border-fuchsia-600 relative mb-4 mt-10" data-te-input-wrapper-init>
                            <label
                              for="exampleFormControlInput1"
                              class="text-neutral-400 pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-white transition-all duration-200 ease-out peer-focus:-translate-y-[2rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                            >Change Name
                            </label>
                            <br></br>
                            <input
                              class="text-white peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                              type="name" placeholder="Enter name" value={name} onChange={(event) => setName(event.target.value)} />
                          </div>
                          <div >{showSuccessMessageName && <p class="text-white">Name change successful!</p>}</div>
                          <button class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded">
                            Change name
                          </button>
                        </form>

                        <form onSubmit={changePassword}>
                          <br></br>
                          <div class="border-2 border-fuchsia-600 relative mb-4 " data-te-input-wrapper-init>
                            <label
                              for="exampleFormControlInput11"
                              class="text-neutral-400 pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-white transition-all duration-200 ease-out peer-focus:-translate-y-[2rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                            >Password (Must have 1 capital letter, 1 lowercase letter, 1 number and a minimum length of 8)
                            </label>
                            <br></br>
                            <input
                              class="text-white peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 text-white"
                              type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"></input>
                          </div>
                          <div>{showSuccessMessagePassword && <p class="text-white">Password change successful!</p>}</div>
                          <button class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded">
                            Change password
                          </button>
                        </form>
                      </div>
                    </div>
                  }


                  {isLoading ?
                    <div>
                      {activeTab === "tab3" &&
                        <div className="mb-3 mt-md-4">
                          <div style={{ display: 'flex' }}>
                            {
                              purchasedItems.map((item, id) => (
                                <div key={id} style={{ marginRight: '10px' }}>
                                  <h2>Item: {item.name}</h2>
                                  <img src={item.image_url} style={{ width: '150px', height: '150px' }} />
                                  <p>Description: {item.description}</p>
                                  <p>Price: {item.price * 0.5} <img class="w-10 h-10" src="JeacstarNF.png"></img></p>
                                  <button id={item.id} onClick={() => sellItem(userInfo.id, item.id)}>Sell Item</button><br></br>
                                  <button id={item.id} onClick={() => { setAvatar(userInfo.id, item.id) }}>Set as Avatar</button>
                                </div>
                              ))
                            }
                          </div>
                        </div>}
                    </div> :
                    <svg aria-hidden="true" class="inline-flex items-center w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                  }

                  {activeTab === "tab4" && <div>Content for Tab 4</div>}

                </div>
              </div>
            </div>
          </div>
        </div>
        :
        <div>
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
    </div >
  );
};

export default UserInfo;

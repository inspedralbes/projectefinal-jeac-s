import { useSelector, useDispatch } from 'react-redux';
import { store, actions } from './store'; // import the Redux store
import React, { useState, useEffect } from 'react';
import routes from '../index.js';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const UserInfo = () => {
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const token = localStorage.getItem('access_token');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [storeItems, setStoreItems] = useState([]);
    const [boughtItems, setBoughtItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingHistorial, setIsLoadingHistorial] = useState(false);
    const [playedGames, setPlayedGames] = useState([]);
    const userInfo = useSelector((state) => state.data);
    const otherInfo = useSelector((state) => state.dataOthers);
    const avatarUserInfo = useSelector((state) => state.boughtItems);
    const avatarStore = useSelector((state) => state.storeItems);
    const otherUserInfo = useSelector((state) => state.getUserId);
    const dispatch = useDispatch();
    const [showSuccessMessagePassword, setShowSuccessMessagePassword] = useState(false);
    const [showSuccessMessageName, setShowSuccessMessageName] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch(routes.fetchLaravel + `/api/showProfileOthers?userId=${otherUserInfo.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const users = await response.json();
                dispatch(actions.dataOthers(users))
            } catch (error) {
                console.error(error);
            }
        }
        fetchUsers();
        /*
                async function fetchStoreItems() {
                   
                    }
                }
                fetchStoreItems();
        
                async function fetchBoughtItems() {
                  
                }
                fetchBoughtItems();*/

        async function fetchPlayedGame() {
            try {
                const response = await fetch(routes.fetchLaravel + `/api/showPlayedGame?userId=${otherUserInfo.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const infoPlayedGame = await response.json();
                setPlayedGames(infoPlayedGame);
                setIsLoadingHistorial(true);
            } catch (error) {
                console.error(error);
            }
        }
        fetchPlayedGame();
    }, []);

    /*const purchasedItems = storeItems.filter(item => {
        return boughtItems.some(boughtItem => boughtItem.userId === userInfo.id && boughtItem.itemId === item.id);
    });*/

    const [activeTab, setActiveTab] = useState("tab1"); // initialize active tab to tab1

    const handleTabClick = (tab) => {
        setActiveTab(tab); // update active tab based on the tab clicked
    };

    /*function avatar() {
        let imgAvatar = "";

        if (isLoggedIn) {
            if (avatarUserInfo.length > 0) {
                const matchingItems = avatarUserInfo.filter(item => item.avatar && item.userId === userInfo.id);
                if (matchingItems.length > 0) {
                    const userAvatarItem = avatarStore.find(item => item.id === matchingItems[0].itemId);
                    imgAvatar = userAvatarItem.image_url;
                }
            }
        }
        return imgAvatar
    }*/

    return (
        <div class="overflow-auto bg-image-all bg-cover bg-no-repeat bg-center bg-fixed flex h-screen justify-center items-center ">
            {isLoggedIn ?
                <div class=" container h-full w-3/4 p-10">
                    <div class="block rounded-lg bg-gray-800 shadow-lg dark:bg-neutral-800">
                        <div class="p-4">
                            <div class="md:m-6 md:p-12">
                                <div class="text-center text-white">
                                    <nav class="backdrop-filter backdrop-blur-l bg-opacity-30 border-b-4 border-fuchsia-600">
                                        <div class="flex space-x-4">

                                            <li className={`w-1/4 list-none ${activeTab === "tab1" ? "active" : ""}`}>
                                                <a onClick={() => handleTabClick("tab1")} class="text-gray-300 text-xl hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 font-medium">
                                                    {t('profileUserInfo')}
                                                </a>
                                            </li>

                                            <li className={`w-1/4 list-none ${activeTab === "tab2" ? "active" : ""}`}>
                                                <a onClick={() => handleTabClick("tab2")} class="text-gray-300 text-xl hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 font-medium">
                                                    {t('profileHistorial')}
                                                </a>
                                            </li>

                                            <li className={`w-1/4 list-none ${activeTab === "tab3" ? "active" : ""}`}>
                                                <a onClick={() => handleTabClick("tab3")} class="text-gray-300 text-xl hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 font-medium">
                                                    {t('profileColeccionables')}
                                                </a>
                                            </li>

                                            <li className={`w-1/4 list-none ${activeTab === "tab4" ? "active" : ""}`}>
                                                <a onClick={() => handleTabClick("tab4")} class="text-gray-300 text-xl hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                                                    Tus Juegos
                                                </a>
                                            </li>

                                        </div>
                                    </nav>
                                    <br></br>

                                    {activeTab === "tab1" &&
                                        <div>
                                            <br></br>
                                            <table class="table-auto w-full">
                                                <thead>
                                                    <tr>
                                                        <th class="w-1/4 border-fuchsia-600 border-b">
                                                            {t('profileProfilePicture')}
                                                        </th>
                                                        <th class="w-1/4 border-fuchsia-600 border-b">
                                                            {t('profileName')}
                                                        </th>
                                                        <th class="w-1/4 border-fuchsia-600 border-b">
                                                            {t('profileTotalScore')}
                                                        </th>
                                                        <th class="w-1/4 border-fuchsia-600 border-b">
                                                            Jeacstars
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <br></br>
                                                <tbody>
                                                    <tr>
                                                        <td><img class="rounded-full w-full border-4 border-fuchsia-600" /*src={avatar()}*/ alt=""></img></td>
                                                        <td><h4 class="text-2xl">{otherInfo.name}</h4></td>
                                                        <td><h4 class="text-2xl">{otherInfo.totalScore}</h4></td>
                                                        <td><h4 class="text-2xl">{otherInfo.jeacstars}<img class="w-10 h-10 inline" src="JeacstarNF.png"></img></h4></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                    }

                                    {activeTab === "tab2" &&
                                        <div class="flex w-full">
                                            {isLoadingHistorial ?
                                                <table class="table-auto flex-1">
                                                    <thead>
                                                        <tr>
                                                            <th class="w-1/3 border-fuchsia-600 border-b">
                                                                {t('historialGame')}
                                                            </th>
                                                            <th class="w-1/3 border-fuchsia-600 border-b">
                                                                {t('rankingPScore')}
                                                            </th>
                                                            <th class="w-1/3 border-fuchsia-600 border-b">
                                                                {t('historialDate')}
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <br></br>
                                                    <tbody>
                                                        {playedGames.map((game, userId) => (
                                                            <tr class="h-20 odd:bg-gray-700" key={userId}>
                                                                <td>{game.name}</td>
                                                                <td>{game.score}</td>
                                                                <td>{moment(game.created_at).format('DD MMM YYYY HH:mm:ss')}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table> :
                                                <svg aria-hidden="true" class="inline-flex items-center w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                </svg>
                                            }
                                        </div>
                                    }
                                    <div>

                                        {activeTab === "tab3" &&
                                            <div className="mb-3 mt-md-4">
                                                {isLoading ?

                                                    <div style={{ display: 'flex' }}>
                                                        {
                                                            /*purchasedItems.map((item, id) => (
                                                                <div class="text-center w-1/4" key={id}>
                                                                    <h2>{t('itemsItem')}: {item.name}</h2>
                                                                    <img class="object-center" src={item.image_url} />
                                                                    <p>{t('itemsDesc')}: {item.description}</p>
                                                                    <p>{t('itemsPrice')}: {item.price * 0.5}<img class="w-10 h-10 inline" src="JeacstarNF.png"></img></p>
                                                                </div>
                                                            ))*/
                                                        }
                                                    </div>
                                                    :
                                                    <svg aria-hidden="true" class="inline-flex items-center w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                    </svg>
                                                }
                                            </div>
                                        }
                                    </div>


                                    {activeTab === "tab4" &&
                                        <div></div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div>
                    <div class="p-10 opacity-90 text-center bg-purple-300 rounded-lg">
                        <p class="mb-6 text-lg font-normal text-fuchsia-950 lg:text-2xl sm:px-16 xl:px-48 dark:text-gray-400">
                            {t('profileNotLoggedIn')}
                        </p>
                        <p class="mb-6 text-lg font-normal text-fuchsia-950 lg:text-2xl sm:px-16 xl:px-48 dark:text-gray-400">
                            {t('profileNotLoggedIn2')}
                        </p>
                        <NavLink to="/login">
                            <a href="#" class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-emerald-700 rounded-lg hover:bg-violet-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                                {t('logIn')}
                            </a>
                        </NavLink>
                        <a> </a>
                        <NavLink to="/signin">
                            <a href="#" class=" inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-emerald-700 rounded-lg hover:bg-violet-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                                {t('signIn')}
                            </a>
                        </NavLink>
                    </div>
                </div>
            }
        </div >
    );
};

export default UserInfo;